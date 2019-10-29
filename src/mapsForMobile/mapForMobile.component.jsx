import React, { useState, useEffect} from 'react'
import './mapForMobile.css'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import axios from 'axios'
const dotenv = require('dotenv');

const MapForMobile = () =>{

    const baseURL = process.env.REACT_APP_API

    const [ locationData, setLocationData] = useState( { 
        lng: -98.2103726,
        lat: 19.0409146,
        zoom: [11]
     } )

    const Map = ReactMapboxGl({
        accessToken:
          'pk.eyJ1IjoicGF1bGFudG9uaW9iZyIsImEiOiJjamYxYnVzZ2Iwd3M3MnZvZG9xZmt1Njk4In0.5IeWqzisyiqjp2aZ9G61Ug'
    });

    useEffect(() => {
        
        //vamos por los datos y los pasamos la location data
    })

    return (
        <div className = "mapForMobileContainer">
            <Map
                style="mapbox://styles/mapbox/streets-v8"
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
                center = {[locationData.lng, locationData.lat ]}
                zoom = {locationData.zoom}
            >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-98.2103726, 19.0409146]} />
                </Layer>
            </Map>;
        </div>
    )
}

// class mapForMobile extends React.Component {

//     const Map = ReactMapboxGl({
//         accessToken:
//           'pk.eyJ1IjoicGF1bGFudG9uaW9iZyIsImEiOiJjamYxYnVzZ2Iwd3M3MnZvZG9xZmt1Njk4In0.5IeWqzisyiqjp2aZ9G61Ug'
//       });

//     render(){
//         return (
//             <div className = "mapForMobileContainer debug">
//                 <h1>Soy la pantalla del mapa</h1>
//             </div>
//         )
//     }
// }

export { MapForMobile }