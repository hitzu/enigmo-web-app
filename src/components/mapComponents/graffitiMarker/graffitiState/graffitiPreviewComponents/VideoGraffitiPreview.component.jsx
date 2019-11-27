import React from 'react'
import PropTypes from 'prop-types'

class VideoGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiDescription : PropTypes.string.isRequired,
        graffitiVideo : PropTypes.string.isRequired
    }

    render(){

        const { graffitiDescription, graffitiImage } = this.props

        console.log(graffitiImage)
        return(
            <div style = {{
                height:'100%', 
                width:'100%',
                backgroundColor: 'green'
            }}> 
                <h1>{ graffitiDescription }</h1>
                <video className="video-container video-container-overlay" autoPlay="" loop="" muted="" data-reactid=".0.1.0.0">
                  <source type="video/mp4" data-reactid=".0.1.0.0.0" src="mov_bbb.mp4"/>
                </video>
            </div>
        )
    }
}

export { VideoGraffitiPreview }