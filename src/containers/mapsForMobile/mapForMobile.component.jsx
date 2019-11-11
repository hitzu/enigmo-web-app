import React, { useState, useEffect } from "react"
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { getMapData } from './services/'

  const layerPaint = {
    'heatmap-weight': {
      property: 'priceIndicator',
      type: 'exponential',
      stops: [[0, 0], [5, 2]]
    },
    // Increase the heatmap color weight weight by zoom level
    // heatmap-ntensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': {
      stops: [[0, 0], [5, 1.2]]
    },
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.25,
      'rgb(103,169,207)',
      0.5,
      'rgb(209,229,240)',
      0.8,
      'rgb(253,219,199)',
      1,
      'rgb(239,138,98)',
      2,
      'rgb(178,24,43)'
    ],

    'heatmap-radius': {
        stops: [[0, 1], [5, 50]]
      }
}

const styleMapContainer = {
    width: "100vw",
    height: "calc(100vh - 80px)",
    position: "absolute"
};

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY
  });


const MapForMobile = (props) =>{

    const [loaded, setLoaded ] = useState(false)
    const [locationData, setLocationData] = useState( { 
        latitude: props.match.params.lng,
        longitude: props.match.params.lat,
        zoom: [9]
    })
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
                const result = await getMapData(locationData.latitude, locationData.longitude)
                setCajeros(result.data.cajeros.slice(1,500))

                
            }
    
            if (!loaded) {
                loadMap()
                setLoaded(true)
            }
        }, [loaded])


    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle = { styleMapContainer }
            center = { [locationData.latitude, locationData.longitude] }
            zoom = { locationData.zoom }
        >
            <Layer type = "heatmap" paint = {layerPaint}>
                {
                    cajeros.map( ( cajero, index ) => (
                        <Feature key = { index } coordinates = { [cajero.lon, cajero.lat] } properties = {cajero} ></Feature>
                     ) )
                }
            </Layer>

        </Map>


    )
}

export { MapForMobile }

