import React from 'react'
import './mapForMobile.css'
import 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css'

class mapForMobile extends React.Component {

    render(){
        return (
            <div className = "mapForMobileContainer debug">
                <h1>Soy la pantalla del mapa</h1>
            </div>
        )
    }
}

export { mapForMobile }