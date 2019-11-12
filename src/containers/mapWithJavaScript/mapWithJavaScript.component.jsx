import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapData } from "../mapsCluster/services"

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

let cajerosGJ = {}

const MapWithJavaScript = (props) => {
    const [loaded, setLoaded ] = useState(false)
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const [locationData, setLocationData] = useState({ 
        latitude: props.match.params.lat,
        longitude: props.match.params.lng,
        zoom: 9.0
    }) 
    const [cajeros, setCajeros] = useState({
        "type":"FeatureCollection",
        "features":[]
    })




    useEffect( () => {
        async function loadMap (){
            const result = await getMapData(locationData.latitude, locationData.longitude)
            //setCajeros(result.data.cajeros.slice(1,200))
            var geojsonCajeros = {
                "type":"FeatureCollection",
                "features":[]
            };
            result.data.cajeros.slice(1,50).map((cajero, index) => {
                geojsonCajeros.features.push(getGeoJsonFeature(cajero, 0))
            })
            
            cajerosGJ = geojsonCajeros
            console.log(cajerosGJ)
            setLoaded(true)
        }

        if (!loaded) {
            loadMap()
            setLoaded(true)
        }
    }, [loaded])

    useEffect(() => {

        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
        const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [locationData.longitude, locationData.latitude],
            zoom: locationData.zoom
        });

        map.on("load", () => {
            setMap(map);
            map.resize();

            map.addSource('earthquakes', {
                "type": "geojson",
                "data": cajerosGJ
                });
                 
                map.addLayer({
                "id": "earthquakes-heat",
                "type": "heatmap",
                "source": "earthquakes",
                "maxzoom":9 ,
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
                9, 3
                ],
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
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
                9, 0
                ],
                }
                }, 'waterway-label');
                 
                map.addLayer({
                "id": "earthquakes-point",
                "type": "circle",
                "source": "earthquakes",
                "minzoom": 7,
                "paint": {
                // Size circle radius by earthquake magnitude and zoom level
                "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 1,
                6, 4
                ],
                16, [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, 5,
                6, 50
                ]
                ],
                // Color circle by earthquake magnitude
                "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, "rgba(33,102,172,0)",
                2, "rgb(103,169,207)",
                3, "rgb(209,229,240)",
                4, "rgb(253,219,199)",
                5, "rgb(239,138,98)",
                6, "rgb(178,24,43)"
                ],
                "circle-stroke-color": "white",
                "circle-stroke-width": 1,
                // Transition from heatmap to circle layer by zoom level
                "circle-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 0,
                8, 1
                ]
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


        })
    };


if (!map) initializeMap({ setMap, mapContainer });
}, [map]);

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


// import React, { useState, useEffect } from "react"
// import mapboxgl from 'mapbox-gl'


// const MapWithJavaScript = (props) =>{

//     const [locationData, setLocationData] = useState({ 
//         latitude: props.match.params.lng,
//         longitude: props.match.params.lat,
//         zoom: 9.0
//     }) 
    
//     mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
//     const map = new mapboxgl.Map({
//         container: this.mapContainer,
//         style: 'mapbox://styles/mapbox/streets-v9',
//         center: [locationData.longitude, locationData.latitude],
//         zoom : locationData.zoom
//     });


//     map.on('move', () => {
//         console.log(map.getCenter())
//     })

//     return (
//         <>
//             <div>
//                 <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
//                 <div>{`Longitude: ${locationData.longitude} Latitude: ${locationData.latitude} Zoom: ${locationData.zoom}`}</div>
//                 </div>
//                 <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
//             </div>
//         </>
//     )
// }

// export { MapWithJavaScript }