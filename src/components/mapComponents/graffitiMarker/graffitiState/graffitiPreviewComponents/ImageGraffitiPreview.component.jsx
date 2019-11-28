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
                backgroundSize : "cover"
            }}> 
            </div>
        )
    }
}

export { ImageGraffitiPreview }