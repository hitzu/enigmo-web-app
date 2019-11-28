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
                
                backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
                borderRadius: "19px",
                background: "rgba(0,0,0,0.23)",
                
                background: "#FFFFFF",
                fontFamily: "Okomito-Medium",
                fontSize: "10px",
                color: "#000000",
                letterSpacing: "-0.2px",
                textAlign: "center",
                background: "rgba(0,0,0,0.23)",
                borderRadius: "1.5px",
                width:'159px', 
                height:'47px',

                display: "flex",
                justifyContent : "center",
                alignItems: "center"
                
            }}> 
                <audio 
                    style = {{
                        width : "159px",
                        height : "47px"
                    }}
                    ref="audio_tag" 
                    src= {graffitiAudio}
                    controls autoPlay/>
            </div>
        )
    }
}

export { AudioGraffitiPreview }