import React from 'react'
import PropTypes from 'prop-types'

class ImageGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiImage : PropTypes.string.isRequired
    }

    render(){

        const { graffitiImage } = this.props

        return(
            <div style = {{
                height:'256px', 
                width:'159px',
                backgroundImage : `url(${graffitiImage})`,
                backgroundSize : "contain",
                backgroundPosition : "center",
                backgroundRepeat : "no-repeat",
                backgroundColor : "black",
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                borderRadius: "15px",
            }}> 
            </div>
        )
    }
}

export { ImageGraffitiPreview }