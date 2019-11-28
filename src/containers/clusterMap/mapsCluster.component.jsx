import React from 'react'
import mapboxgl from 'mapbox-gl'
import axios from "axios";
import ReactDOM from 'react-dom'
import { MarkerCluster, MarkerContainer } from '../../components/mapComponents'
import socketIOClient from "socket.io-client";
import jwt from "jsonwebtoken";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class ClusterMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: props.match.params.lng,
      lat: props.match.params.lat,
      zoom: 13,
      isSelected : false,
      filters:{
        from:"all",
        locationCards:true,
        text:true,
        video:true,
        audio:true,
        image:true,
        stamps:true,
        stickers:true,
        top:"fire",
        time:169 //una hora despues de 7 dias, eso representa all
      }
    };
    this.graffitiPreview = React.createRef();
    this.token = props.match.params.token
    this.endpoint = process.env.REACT_APP_SOCKET_URL+"/mapActions"
    this.socket = socketIOClient(this.endpoint);
    this.UIID = "none"
  }

  hideAllPreviews = () => {
    console.log("jajaja entro aqui ")
    this.graffitiPreview.current.hidePreviewGraffiti()
  }

  markers = {};
  markersOnScreen = {}; 
  point_counts = [];
  totals;
  markerUserLocation;

  emitOpenGraffiti = (idGraffiti)=>{
    console.log("jajajaja abrieron graffiti")
    this.socket.emit("open/Graffiti",{UIID:this.UIID, idGraffiti:idGraffiti})
  }
  emitOpenEvent = (idEvent)=>{
    this.socket.emit("open/Event",{UIID:this.UIID, idEvent:idEvent})
  }
  emitOpenStamp = (idStamp)=>{
    this.socket.emit("open/Stamp",{UIID:this.UIID, idStamp:idStamp})
  }
  emitOpenCardLocation = (idCardLocation)=>{
    this.socket.emit("open/CardLocation",{UIID:this.UIID, idCardLocation:idCardLocation})
  }

  
  updateMarkers = () => {
    // keep track of new markers
    let newMarkers = {};
    // get the features whether or not they are visible (https://docs.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures)
    const features = this.map.querySourceFeatures('enigmoData');
    // loop through each feature
    features.forEach((feature) => {
      const coordinates = feature.geometry.coordinates;
      // get our properties, which include our clustered properties
      const props = feature.properties;
      // continue only if the point is part of a cluster
      if (!props.cluster) {
          const id = props.id
          let marker = this.markers[id];
          if (!marker){

            this.totals = this.getPointCount(features);
            // create an html element (more on this later)
            var propsJson = JSON.parse(props.item)
            var el = document.createElement("div");
            ReactDOM.render(
              <MarkerContainer 
                element = { propsJson }
                typeToElement = { props.typeToElement } 
                mapIsDragging = {true}>
              </MarkerContainer>,
              el
            )
            // create the marker object passing the html element and the coordinates
            marker = this.markers[id] = new mapboxgl.Marker({
              element: el
            }).setLngLat(coordinates);
            
          }
          // create an object in our newMarkers object with our current marker representing the current cluster
          newMarkers[id] = marker;

          if (!this.markersOnScreen[id]) {
            marker.addTo(this.map);
          }
      }
      else{  // if yes, get the cluster_id
        
        const id = props.cluster_id;
        // create a marker object with the cluster_id as a key
        let marker = this.markers[id];
        // if that marker doesn't exist yet, create it
        if (!marker) {
          // create an html element (more on this later)
          var el = document.createElement("div");
          ReactDOM.render(
            <MarkerCluster 
              numberElements = {props.point_count_abbreviated}>
            </MarkerCluster>,
            el
          )
          // create the marker object passing the html element and the coordinates
          marker = this.markers[id] = new mapboxgl.Marker({
            element: el
          }).setLngLat(coordinates);
        }
        // create an object in our newMarkers object with our current marker representing the current cluster
        newMarkers[id] = marker;
        
        // if the marker isn't already on screen then add it to the map
        if (!this.markersOnScreen[id]) {
          marker.addTo(this.map);
        }
      }
    });
    
    // check if the marker with the cluster_id is already on the screen by iterating through our markersOnScreen object, which keeps track of that
    for (var id in this.markersOnScreen) {
      // if there isn't a new marker with that id, then it's not visible, therefore remove it. 
      if (!newMarkers[id]) {
        this.markersOnScreen[id].remove();
      }
    }
    // otherwise, it is visible and we need to add it to our markersOnScreen object
      this.markersOnScreen = newMarkers;
  };
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
    let payload = jwt.verify(this.token,process.env.REACT_APP_SECRET_KEY)
    console.log(payload);
    this.UIID = payload.UIID
    const validateFiltersStruct = (filters)=>{
      var isValid = true
      let keysFilters = ["from","locationCards","text","video","audio","image","stamps","stickers","top","time"]
      keysFilters.forEach(e => {
        if (!Object.keys(filters).includes(e)){
          isValid = false
          return;
        }
      });
      return isValid
    }
    this.socket.on("update/filters",content =>{
      if (content.filters && validateFiltersStruct(content.filters)) {
        this.setState({filters:content.filters})        
      }else{console.error("invalid struct filter Received",content.filters)}
    })
    this.socket.on("update/MapStyle",content =>{
      if (content.mapStyle && ["dark-v10",'light-v10','satellite-v9'].includes(content.mapStyle)) {
        this.map.setStyle('mapbox://styles/mapbox/' + content.mapStyle);
      }else{console.error("invalid map style Received",content.mapStyle)}
    })
    this.socket.on("update/userLocation",content =>{
      this.markerUserLocation.setLngLat([content.lng,content.lat])
    })
    this.socket.on("flyTo",content =>{
      this.map.easeTo({
        center: content.center,
        zoom: content.zoom,duration:200
      })
      setTimeout(() => {
        this.updateMarkers()
        
      }, 600);
    })

    this.socket.emit("subscribe",this.UIID)

    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());
 
    const SnifferCards = ['==', ['get', 'typeToElement'], 'SnifferCards'];
    const SnifferPromotions = ['==', ['get', 'typeToElement'], 'SnifferPromotions'];
    const event = ['==', ['get', 'typeToElement'], 'event'];
    const locationsCards = ['==', ['get', 'typeToElement'], 'locationsCards'];
    const graffiti = ['==', ['get', 'typeToElement'], 'graffiti'];
    
    this.map.on('load', async  ()=> {
      this.markerUserLocation = new mapboxgl.Marker({
        element: this.createUserLocation("locationUser",1)
      }).setLngLat([this.state.lng,this.state.lat]);
      this.markerUserLocation.addTo(this.map)

      const enigmoDataReceived = await axios({
      url : `https://api2.enigmo.mx:3003/stamp/sniffer`,
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
        url : `https://api2.enigmo.mx:3003/graffiti/byLocation`,
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

      for (const item of enigmoDataReceived.data.locationsCards) {
        enigmoData.features.push(this.getGeoJsonFeature(item, "locationsCards"))
      }

      this.map.addSource('enigmoData', {
        'type': 'geojson',
        'data': enigmoData,
        'cluster': true,
        'clusterRadius': 80,
        'clusterProperties': {
          'SnifferCards': ['+', ['case', SnifferCards, 1, 0]],
          'SnifferPromotions': ['+', ['case', SnifferPromotions, 1, 0]],
          'event': ['+', ['case', event, 1, 0]],
          'locationsCards': ['+', ['case', locationsCards, 1, 0]],
          'graffiti': ['+', ['case', graffiti, 1, 0]],  
        }
      });

      this.map.addLayer({
        'id' : 'clusters',
        'type': 'circle',
        'source': 'enigmoData',
        "filter": ["==", "cluster", true],
        'paint' : {
          "circle-color" : 'rgba(0,0,0,0)',
          "circle-opacity": 0.6,
          "circle-radius": 12
        }
      })

      this.map.on('click', 'clusters',  (e) =>{
        
        var features = this.map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        this.map.getSource('enigmoData').getClusterExpansionZoom(clusterId,  (err, zoom) =>{
          if (err)
            return;
          this.map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
            duration:200
          });
          this.socket.emit("flyTo",{UIID:this.UIID,center:features[0].geometry.coordinates,zoom:zoom})
          setTimeout(() => {
            this.updateMarkers()
            
          }, 500);
        });
      });

      this.map.on('data', (e) => {
        if (e.sourceId !== 'enigmoData' || !e.isSourceLoaded) return;
        this.map.on('move', ()=>{
          this.setState({
            lng: this.map.getCenter().lng,
            lat: this.map.getCenter().lat,
            zoom: this.map.getZoom()
          })          
          this.socket.emit("update/userLocation",{UIID:this.UIID,lat:this.state.lat,lng:this.state.lng})
          this.updateMarkers()
        });
        this.map.on('moveend', this.updateMarkers);
        this.map.on('dragstart', () => {
        })

        this.map.on('dragend', () => {
        })
        this.updateMarkers();
      });

      this.getPointCount = (features) => {
        features.forEach(f => {
          if (f.properties.cluster) {
            this.point_counts.push(f.properties.point_count)
          }
        })
        return this.point_counts;
      };
    });

    
    this.createUserLocation = (props, totals) => {
      var div = document.createElement("div");
      div.style.width = "30px";
      div.style.height = "30px";
      div.style.background = "yellow";
      div.style.borderRadius = "50%";
      div.style.color = "green";
      div.innerHTML = props;
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
 export {ClusterMap}