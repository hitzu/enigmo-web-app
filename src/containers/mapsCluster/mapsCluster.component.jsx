import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import axios from "axios";
import socketIOClient from "socket.io-client";
import jwt from "jsonwebtoken";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

class MapsCluster extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      response:0,
      endpoint:"http://localhost:3004/mapActions"
    };
  }

  getGeoJsonFeature = (location,deltaLog,deltaLat)=>{
    return {
      "type": "Feature", "properties": { "id": Math.round(5000*Math.random()+1)+""+Date.now(), "mag": (5*Math.random()+1), "time": 1506794299451, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ location.lon+deltaLog,location.lat+deltaLat ] }
    }
  }

  componentDidMount() {
    var dataGeojson = {
      "type": "FeatureCollection",
      "features": []
    };

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVSUlEIjoiRVNUT0VTVU5VSUlEX1hEUFVUT1MiLCJpYXQiOjE1NzQ0NDE1MzgsImp0aSI6IjMxOTRhYmZmLTdkMTEtNDQxOS05OTU4LTRiMWM1ZTY1NTUxYSIsImV4cCI6MTU3NDQ0OTE3N30.t76Ob0zBfZrrcaIjXxS72dfarwmPA2gkrDhK6SE8EjM"
    let payload = jwt.verify(token,process.env.REACT_APP_SECRET_KEY)
    console.log(payload);
    
    const socket = socketIOClient(this.state.endpoint);

    socket.emit("subscribe",payload.UIID)
    socket.on("")
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    

    map.addControl(new mapboxgl.NavigationControl());
 
    // filters for classifying earthquakes into five categories based on magnitude
    var mag1 = ["<", ["get", "mag"], 2];
    var mag2 = ["all", [">=", ["get", "mag"], 2], ["<", ["get", "mag"], 3]];
    var mag3 = ["all", [">=", ["get", "mag"], 3], ["<", ["get", "mag"], 4]];
    var mag4 = ["all", [">=", ["get", "mag"], 4], ["<", ["get", "mag"], 5]];
    var mag5 = [">=", ["get", "mag"], 5];
    
    // colors to use for the categories
    var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
    
    map.on('load', async  ()=> {

      const response = await axios.get('https://raw.githubusercontent.com/ivansabik/ubicajeros-api/master/cajeros.json');

      for (const item of response.data.cajeros) {
        dataGeojson.features.push(this.getGeoJsonFeature(item,0,0))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,10,21))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,16,-55))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,22,-35))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,29,-28))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,32,-20))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,0,-9))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,5,0))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,9,5))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,10,9))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,16,10))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,22,16))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,29,22))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,32,29))
        // dataGeojson.features.push(this.getGeoJsonFeature(item,38,32))
       
       
      }
      

      
      // add a clustered GeoJSON source for a sample set of earthquakes
      map.addSource('earthquakes', {
        "type": "geojson",
        // "data": "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        "data": dataGeojson,
        "cluster": true,
        "clusterRadius": 80,
        "clusterProperties": { // keep separate counts for each magnitude category in a cluster
          "mag1": ["+", ["case", mag1, 1, 0]],
          "mag2": ["+", ["case", mag2, 1, 0]],
          "mag3": ["+", ["case", mag3, 1, 0]],
          "mag4": ["+", ["case", mag4, 1, 0]],
          "mag5": ["+", ["case", mag5, 1, 0]]
        }
      });
      // circle and symbol layers for rendering individual earthquakes (unclustered points)
      map.addLayer({
        "id": "earthquake_circle",
        "type": "circle",
        "source": "earthquakes",
        "filter": ["!=", "cluster", true],
        "paint": {
          "circle-color": ["case",
          mag1, colors[0],
          mag2, colors[1],
          mag3, colors[2],
          mag4, colors[3], colors[4]],
          "circle-opacity": 0.6,
          "circle-radius": 12
        }
      });
      map.addLayer({
        "id": "earthquake_label",
        "type": "symbol",
        "source": "earthquakes",
        "filter": ["!=", "cluster", true],
        "layout": {
          "text-field": ["number-format", ["get", "mag"], {"min-fraction-digits": 1, "max-fraction-digits": 1}],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-size": 10
        },
        "paint": {
        "text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"]
        }
      });
      
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": ["rgba", 1, 1, 1, 0.45 ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18, 10,
            24, 100,
            32, 1000,
            50
          ]
        }
      });
      
      
      map.on('click', 'clusters', function (e) {
        
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
          if (err)
            return;
          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
            duration:200
          });
          setTimeout(() => {
            updateMarkers("easeTo")
          }, 600);
        });
      });
      
      map.on('click', 'earthquake_circle', function (e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.mag)
        .addTo(map);
        console.log("toco a un single....")
      });
      
      // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
      map.on('data', function (e) {
        console.log("locas locas todas!!!!");
        
        if (e.sourceId !== 'earthquakes' || !e.isSourceLoaded) return;
        
        map.on('move', ()=>{
          updateMarkers("move")
        });
        map.on('moveend', ()=>{
          // updateMarkers("moveend")
          
        });
        updateMarkers();
      });
    });

    // objects for caching and keeping track of HTML marker objects (for performance)
    var markers = {};
    var markersOnScreen = {};

    var updateMarkers = (from = null) => {
      console.log("me llamo ---> ",from);
      
      const { lng, lat } = map.getCenter();

      // this.setState({
      //   lng: lng.toFixed(4),
      //   lat: lat.toFixed(4),
      //   zoom: map.getZoom().toFixed(2)
      // });
      var newMarkers = {};
      var features = map.querySourceFeatures('earthquakes');
      
      // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
      // and add it to the map if it's not there already
      for (var i = 0; i < features.length; i++) {
        var coords = features[i].geometry.coordinates;
        var props = features[i].properties;
        // console.log(props);

        if (!props.cluster) {
          

            var id = props.id;
          
          var marker = markers[id];
          if (!marker) {
            var el = (<div style = {{width:"30px",height:"30px",backgroundColor:"blue"}}>{Math.trunc(props.mag)}</div>)
            var tooltipContainer = document.createElement('div');
            ReactDOM.render(el,tooltipContainer)
            marker = markers[id] = new mapboxgl.Marker({element: tooltipContainer}).setLngLat(coords);
          }
          newMarkers[id] = marker;
          
          if (!markersOnScreen[id])
            marker.addTo(map);

        }else{
          var id = props.cluster_id;
          
          var marker = markers[id];
          if (!marker) {
            var el = createDonutChart(props);
            marker = markers[id] = new mapboxgl.Marker({element: el}).setLngLat(coords);
          }
          newMarkers[id] = marker;
          
          if (!markersOnScreen[id])
            marker.addTo(map);
        }
      }
      // for every marker we've added previously, remove those that are no longer visible
      for (id in markersOnScreen) {
        if (!newMarkers[id])
          markersOnScreen[id].remove();
      }
      markersOnScreen = newMarkers;
    }

    // code for creating an SVG donut chart from feature properties
    var  createDonutChart = (props) =>{
      
      var offsets = [];
      var counts = [props.mag1, props.mag2, props.mag3, props.mag4, props.mag5];
      var total = 0;
      for (var i = 0; i < counts.length; i++) {
        offsets.push(total);
        total += counts[i];
      }
      var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
      var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
      var r0 = Math.round(r * 0.6);
      var w = r * 2;
      
      var html = '<svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w +
      '" text-anchor="middle" style="font: ' + fontSize + 'px sans-serif" >';
      
      for (i = 0; i < counts.length; i++) {
        html += donutSegment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i]);
      }
      html += '<circle cx="' + r + '" cy="' + r + '" r="' + r0 +
      '" fill="white" id = '+ props.cluster_id+' /><text dominant-baseline="central" transform="translate(' +
      r + ', ' + r + ')" id = '+ props.cluster_id+'>' + total.toLocaleString() + '</text></svg>';
      
      var el = document.createElement('div');
      el.innerHTML = html;
      return el.firstChild;
    }
    
    var  donutSegment = (start, end, r, r0, color) =>{
      if (end - start === 1) end -= 0.00001;
      var a0 = 2 * Math.PI * (start - 0.25);
      var a1 = 2 * Math.PI * (end - 0.25);
      var x0 = Math.cos(a0), y0 = Math.sin(a0);
      var x1 = Math.cos(a1), y1 = Math.sin(a1);
      var largeArc = end - start > 0.5 ? 1 : 0;
      
      return ['<path d="M', r + r0 * x0, r + r0 * y0, 'L', r + r * x0, r + r * y0,
      'A', r, r, 0, largeArc, 1, r + r * x1, r + r * y1,
      'L', r + r0 * x1, r + r0 * y1, 'A',
      r0, r0, 0, largeArc, 0, r + r0 * x0, r + r0 * y0,
      '" fill="' + color + '" />'].join(' ');
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
 export {MapsCluster}