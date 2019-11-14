import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapData } from "../mapsCluster/services"
import axios from 'axios'

const styles = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute"
};

const getGeoJsonFeature = (location, offset)=>{
    return {
      "type": "Feature", "properties": { "mag": (5*Math.random()+1), "time": 1506794299451, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ location.lon + offset,location.lat + offset ] }
    }
}

const MapWithJavaScript = (props) => {
    const [loaded, setLoaded ] = useState(false)
    const [showMarkers, setShowMarkers ] = useState(false)
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [locationData, setLocationData] = useState({ 
        latitude: props.match.params.lat,
        longitude: props.match.params.lng,
        zoom: 16.0
    }) 
    const [cajeros, setCajeros] = useState({
        "type":"FeatureCollection",
        "features":[]
    })

    useEffect( () => {
        async function loadMap (){
            const result = await getMapData(locationData.latitude, locationData.longitude)
            const features = []
            result.data.cajeros.slice(1,50).map((cajero, index) => {
                features.push(getGeoJsonFeature(cajero, 0))
            })
            
            setLoaded(true)
            setCajeros( () => {
                cajeros.features.push( ...features)
            })
        }

        if (!loaded) {
            loadMap()
            setLoaded(true)
        }
    }, [loaded])

    useEffect(() => {

        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
        const initializeMap = async ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
                center: [locationData.longitude, locationData.latitude],
                zoom: locationData.zoom
            });

            map.on("load", () => {
                setMap(map);
                console.log(map)
                map.resize();

                map.addSource('earthquakes', {
                    "type": "geojson",
                    "data": cajeros
                    });
                    
                    map.addLayer({
                    "id": "earthquakes-heat",
                    "type": "heatmap",
                    "source": "earthquakes",
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
                    
            });

            map.on("move", () => {
                const { lng, lat } = map.getCenter()
                let newLocation = {
                    latitude: lat,
                    longitude: lng,
                    zoom: map.getZoom()
                }
                setLocationData(newLocation)
                if (map.getZoom() > 17){ 

                }
            })
        };

if (!map) initializeMap({ setMap, mapContainer });
}, [map]);




const showMarkersFunction = () => {
    
    console.log("aqui entro a mostrar los markers")
    console.log(map)
    
    // add markers to map
    cajeros.features.forEach( (marker) => {
        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates)
    })
    // cajeros.features.forEach(function(marker) {


    //     console.log(marker)
    //     // create a HTML element for each feature
    //     var el = document.createElement('div');
    //     el.className = 'marker';

    //     // make a marker for each feature and add to the map
    //     new mapboxgl.Marker(el)
    //     .setLngLat(marker.geometry.coordinates)
    //     // .addTo(map);
    // });

}


return (
    <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>
                {`Longitude: ${locationData.longitude} Latitude: ${locationData.latitude} Zoom: ${locationData.zoom}`}
            </div>
        </div>
        <div ref={el => (mapContainer.current = el)} style={styles} />
    </div>
)
};

export {MapWithJavaScript}
