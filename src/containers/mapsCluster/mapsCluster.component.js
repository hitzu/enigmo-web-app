import React, { useState, useEffect } from "react"
import MapGL, { Marker } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getMapData } from './services/'

const style = {
    width: '20px',
    height: '20px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '20px',
    textAlign: 'center'
  };
  
  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
    </Marker>
  );


const MapsCluster = (props) => {

    const [viewport , setViewport] = {
        latitude: props.match.params.lat,
        longitude: props.match.params.lng,
        zoom: 15
    };
    const [loaded, setLoaded ] = useState(false)
    const [cajeros, setCajeros] = useState([])

    useEffect( () => {
        async function loadMap (){
            // const result = await getMapData(locationData.latitude, locationData.longitude)
            // const result2 = await getMapData(locationData.latitude, locationData.longitude)
            //  let x = result2.data.cajeros.map(e =>{
            //      e.lon += 13
            //      e.lat += 13
            //      return e
            //  })
            // let hola = [...result.data.cajeros, ...x]
            // console.log(hola.length)
            // console.log(x.length)
            // setCajeros(hola)
            // const result = await getMapData(viewport.latitude, viewport.longitude)
            // console.log(result.data.cajeros.length)
            // setCajeros(result.data.cajeros)

            
        }

        if (!loaded) {
            loadMap()
            setLoaded(true)
        }
    }, [loaded])

    return( 
        <MapGL
            style={{ width: '100%', height: '400px' }}
            mapStyle='mapbox://styles/mapbox/light-v9'
            accessToken={process.env.REACT_APP_MAPBOX_KEY}
            onViewportChange={viewport => setViewport({ viewport })}
            {...viewport}
            >
            {/* <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
                {cajeros.map((cajero, index) => (
                <Marker
                    key={index}
                    longitude={cajero.lon}
                    latitude={cajero.lat}
                >
                    <div style={style} />
                </Marker>
                ))}
            </Cluster> */}
        </MapGL>
    )

}

export {MapsCluster}


// import React, { useState, useEffect } from "react"
// import MapGL, { Marker } from 'react-mapbox-gl';
// import Cluster from '@urbica/react-map-gl-cluster'
// import { getMapData } from './services/'

// const Map = ReactMapboxGl({
//     accessToken: process.env.REACT_APP_MAPBOX_KEY
// });

// const styleMapContainer = {
//     width: "100vw",
//     height: "calc(100vh - 80px)",
//     position: "absolute"
// };

// const mapStyle = {
//   height: '100%',
//   width: '100%'
// };

// const GEOJSON_SOURCE_OPTIONS = {
//     type: 'geojson',
//     data: {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-77.0323, 38.9131]
//       },
//       properties: {
//         title: 'Mapbox DC',
//         'marker-symbol': 'monument'
//       }
//     }
//   };

// const MapsCluster = (props) => {

//     const [popup, setPopup] = useState(undefined)
//     const [loaded, setLoaded ] = useState(false)
//     const [locationData, setLocationData] = useState( { 
//         latitude: props.match.params.lng,
//         longitude: props.match.params.lat,
//         zoom: [15]
//     })
//     const [cajeros, setCajeros] = useState([])
//     const [selected, setSelected] = useState(undefined)

//     const style = {
//         width: '20px',
//         height: '20px',
//         color: '#fff',
//         background: '#1978c8',
//         borderRadius: '20px',
//         textAlign: 'center'
//       };
    
//     const ClusterMarker = ({ longitude, latitude, pointCount }) => (
//         <Marker longitude={longitude} latitude={latitude}>
//           <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
//         </Marker>
//       );


//     useEffect( () => {
//         async function loadMap (){
//             const result = await getMapData(locationData.latitude, locationData.longitude)
//             setCajeros(result.data.cajeros)
//         }

//         if (!loaded) {
//             loadMap()
//             setLoaded(true)
//         }
//     }, [loaded])

//     return (
//         <MapGL
//             style="mapbox://styles/mapbox/streets-v9"
//             containerStyle = { styleMapContainer }
//             center = { [locationData.latitude, locationData.longitude] }
//             zoom = { locationData.zoom }
//         >
//             <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
//                 {
//                     cajeros.map( ( cajero, index ) => (
//                         <Marker
//                             key={index}
//                             longitude={cajero.lon}
//                             latitude={cajero.lat}
//                         >
//                             <div style={style} />
//                         </Marker>
//                      ) )
//                 }
//             </Cluster>
//         </MapGL>
//     )

// }

// export {MapsCluster}