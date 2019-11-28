import React from 'react'
import PropTypes from 'prop-types'

class VideoGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiVideo : PropTypes.string.isRequired
    }

    render(){

        const { graffitiVideo } = this.props
        console.log("desde el video",graffitiVideo)
        return(
            <div style = {{
                height:'256px', 
                width:'159px',
                backgroundColor: 'black',
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                borderRadius: "15px"
            }}> 
                <video style = {{ height:'100%', width:'100%' }} controls autoPlay loop = 'true' muted data-reactid=".0.1.0.0">
                  <source type="video/mp4" data-reactid=".0.1.0.0.0" src={graffitiVideo}/>
                </video>
            </div>
        )
    }
}

export { VideoGraffitiPreview }