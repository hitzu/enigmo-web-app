import React from 'react'
import mapboxgl from 'mapbox-gl'
import axios from "axios";
import ReactDOM from 'react-dom'
import GraffitiMarker from '../../components/mapComponents/GraffitiMarker.component'


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class HeatMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: props.match.params.lng,
      lat: props.match.params.lat,
      zoom: 4
    };
  }

  // getGeoJsonFeature = (location,deltaLog,deltaLat)=>{
  //   return {
  //     "type": "Feature", "properties": { "id": Math.round(5000*Math.random()+1)+""+Date.now(), "mag": (5*Math.random()+1), "time": 1506794299451, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ location.lon+deltaLog,location.lat+deltaLat ] }
  //   }
  // }

  getGeoJsonFeature = (item, typeItem) => {
    let location = item.location.coordinates
    return {
      "type" : "Feature", 
      "properties" : {
        "id": item._id,
        "typeToElement" : typeItem,
        "item" : item
      },
      "geometry" : { 
        "type": "Point", 
        "coordinates": location 
      }
    }  
  }

  componentDidMount() {

    var enigmoData = {
      "type": "FeatureCollection",
      "features": []
    };


    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    map.addControl(new mapboxgl.NavigationControl());
 

    
    map.on('load', async  ()=> {

      // const response = await axios.get('https://raw.githubusercontent.com/ivansabik/ubicajeros-api/master/cajeros.json');

      // for (const item of response.data.cajeros) {
      //   dataGeojson.features.push(this.getGeoJsonFeature(item,0,0))
      // }

      const enigmoDataReceived = await axios({
      url : `http://192.168.10.149:3003/stamp/sniffer`,
      method : 'POST',
      data : {
          "distance":30000000,
          "latitude": 19.0384369, 
          "longitude":-98.2190501,
          "promotions" : true,
          "events" : true
          }
      })

      const enigmoGraffitiReceived = await axios({
        url : `http://192.168.10.149:3003/graffiti/byLocation`,
        method : 'POST',
        data : {
            "distance":30000000,
            "latitude": 19.0384369, 
            "longitude":-98.2190501
            }
      })

      console.log(enigmoGraffitiReceived)

      for (const item of enigmoGraffitiReceived.data.graffiti) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "graffiti"))
      }

      for (const item of enigmoDataReceived.data.SnifferCards) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "SnifferCards"))
      }

      for (const item of enigmoDataReceived.data.SnifferPromotions) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "SnifferPromotions"))
      }

      for (const item of enigmoDataReceived.data.event) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "event"))
      }

      for (const item of enigmoDataReceived.data.locationsCards) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "locationsCards"))
      }

        map.addSource('enigmoData', {
            "type": "geojson",
            "data": enigmoData
        });
        
        map.addLayer({
            "id": "enigmoData-heat",
            "type": "heatmap",
            "source": "enigmoData",
            'layout': {
                'visibility': 'visible'
                },
            "maxzoom":17,
            "paint": {
                // Increase the heatmap weight based on frequency and property magnitude
                "heatmap-weight": [
                    "interpolate",
                    ["linear"],
                    ["get", "mag"],
                    0, 0,
                    6, 1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                "heatmap-intensity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 1,
                    17, 3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0, "rgba(33,102,172,0)",
                    0.3, "blue",
                    0.7, "yellow",
                    1, "red"
                    ],
                    // Adjust the heatmap radius by zoom level
                    "heatmap-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 2,
                    9, 20
                ],
                // Transition from heatmap to circle layer by zoom level
                "heatmap-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7, 1,
                    17, 0
                ],
            }
        }, 'waterway-label');

      map.on('data', (e) => {
        if (e.sourceId !== 'enigmoData' || !e.isSourceLoaded) return;
        map.on('move', updateMarkers);
        map.on('moveend', updateMarkers);
        updateMarkers();
      });

      let markers = {};
      let markersOnScreen = {}; 
      let point_counts = [];
      let totals;

      const updateMarkers = () => {
        console.log("entro a actualizar lsop markers")
        if (map.getZoom() < 5) return
        // keep track of new markers
        let newMarkers = {};
        // get the features whether or not they are visible (https://docs.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures)
        const features = map.querySourceFeatures('enigmoData');
        // loop through each feature
        features.forEach((feature) => {
          const coordinates = feature.geometry.coordinates;
          // get our properties, which include our clustered properties
          const props = feature.properties;
          // continue only if the point is part of a cluster
          if (!props.cluster) {
              const id = props.id
              let marker = markers[id];
              if (!marker){
                totals = getPointCount(features);
                // create an html element (more on this later)
                
                switch (props.typeToElement ){
                  case "locationsCards" :
                    const elLocation = createLocationCard(props, "totals");
                    marker = markers[id] = new mapboxgl.Marker({
                      element: elLocation
                    }).setLngLat(coordinates);
                    break;
                  case "SnifferCards" : 
                    const elSnifferCard = createSnifferCard(props, "totals")
                    marker = markers[id] = new mapboxgl.Marker({
                      element: elSnifferCard
                    }).setLngLat(coordinates);
                    break;
                  case "graffiti" : 
                    console.log(props)
                    const elGraffiti = createGraffiti(props, "totals")
                    marker = markers[id] = new mapboxgl.Marker({
                      element: elGraffiti
                    }).setLngLat(coordinates);
                    elGraffiti.addEventListener('click', () => 
                      { 
                          alert("Marker Clicked."+ props.id);
                      }
                    );
                    break;
                  default :
                    const elOtro = createOtro(props, "totals")
                    marker = markers[id] = new mapboxgl.Marker({
                      element: elOtro
                    }).setLngLat(coordinates);
                    break;
                }
                // create the marker object passing the html element and the coordinates
                
              }
              // create an object in our newMarkers object with our current marker representing the current cluster
              newMarkers[id] = marker;

              if (!markersOnScreen[id]) {
                marker.addTo(map);
              }
          }
          else{  // if yes, get the cluster_id
            console.log(props)

            const id = props.cluster_id;
            // create a marker object with the cluster_id as a key
            let marker = markers[id];
            // if that marker doesn't exist yet, create it
            if (!marker) {
              totals = getPointCount(features);
              // create an html element (more on this later)
              const el = createClusterChido(props, totals);
              // create the marker object passing the html element and the coordinates
              marker = markers[id] = new mapboxgl.Marker({
                element: el
              }).setLngLat(coordinates);
              el.addEventListener('click', () => 
                { 
                    alert("Marker Clicked."+ props);
                }
              );
            }
            
            // create an object in our newMarkers object with our current marker representing the current cluster
            newMarkers[id] = marker;
            
            // if the marker isn't already on screen then add it to the map
            if (!markersOnScreen[id]) {
              marker.addTo(map);
            }
          }
        });
        
        // check if the marker with the cluster_id is already on the screen by iterating through our markersOnScreen object, which keeps track of that
        for (var id in markersOnScreen) {
          // if there isn't a new marker with that id, then it's not visible, therefore remove it. 
          if (!newMarkers[id]) {
            markersOnScreen[id].remove();
          }
        }
        // otherwise, it is visible and we need to add it to our markersOnScreen object
          markersOnScreen = newMarkers;
      };

      const getPointCount = (features) => {
        features.forEach(f => {
          if (f.properties.cluster) {
            point_counts.push(f.properties.point_count)
          }
        })
        return point_counts;
      };
    });

    const createClusterChido = (props, totals) => {
      var div = document.createElement("div");
      var colorBackground = "rgba(0,0,0,0)"

      if ( props.point_count_abbreviated <= 15 ){
        colorBackground = "rgba(4,36,166,0.75)"
      }
      else if(props.point_count_abbreviated > 15 && props.point_count_abbreviated <= 25){
        colorBackground = "rgba(144,206,231,0.75)"
      }
      else if(props.point_count_abbreviated > 25 && props.point_count_abbreviated <= 35){
        colorBackground = "rgba(251,172,1,0.75)"
      }
      else{
        colorBackground = "rgba(244,47,1,0.75)"
      }

      div.style.width = "40px";
      div.style.height = "40px";
      div.style.borderRadius = "20px"
      div.style.borderWidth = "thin"
      div.style.backgroundColor = colorBackground
      div.style.borderColor = "white"
      div.style.textAlign = "center"
      div.style.color = "white";
      div.innerHTML = props.point_count_abbreviated;
      return div
    }

    const createLocationCard = (props, totals) => {
      var div = document.createElement("div");
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.background = "red";
      div.style.color = "white";
      div.innerHTML = props.typeToElement;
      return div
    }

    const createSnifferCard = (props, totals) => {
      var div = document.createElement("div");
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.background = "blue";
      div.style.color = "white";
      div.innerHTML = "cluster";
      return div
    }

    const createGraffiti = (props, totals) => {
      
      var divContainer = document.createElement("div");
      divContainer.style.width = "100px";
      divContainer.style.height = "100px";
      divContainer.style.overflow = 'hidden';
      divContainer.style.borderRadius = "50%"
      var propsJson = JSON.parse(props.item)

      ReactDOM.render(
        React.createElement(
          GraffitiMarker, {
            pictureThumbnailURL : propsJson.idUser.pictureURL,
            pictureURLDescription : propsJson.idUser.pictureURLDescription
          }
        ),
        divContainer
      );

      return divContainer
    }
    
    const createOtro = (props, totals) => {
      var div = document.createElement("div");
      div.style.width = "100px";
      div.style.height = "100px";
      div.style.background = "pink";
      div.style.color = "white";
      div.innerHTML = props.typeToElement;
      return div
    }
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export {HeatMap}

