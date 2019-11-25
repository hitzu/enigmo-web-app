import React from 'react'
import PropTypes from 'prop-types'

class AudioGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiAudio : PropTypes.string.isRequired
    }

    render(){

        const { graffitiAudio } = this.props

        return(
            <div style = {{
                height:'100%', 
                width:'100%',
                backgroundColor: 'green'
            }}> 
                <audio 
                    ref="audio_tag" 
                    src= {graffitiAudio}
                    controls autoPlay/>
            </div>
        )
    }
}

export { AudioGraffitiPreview }