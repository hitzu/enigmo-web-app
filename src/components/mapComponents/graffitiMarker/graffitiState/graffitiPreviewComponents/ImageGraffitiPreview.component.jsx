import React from 'react'
import PropTypes from 'prop-types'

class ImageGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiImage : PropTypes.string.isRequired
    }

    render(){

        const { graffitiImage } = this.props

        console.log(graffitiImage)
        return(
            <div style = {{
                height:'100%', 
                width:'100%',
                backgroundColor: 'green'
            }}> 
                <img src = { graffitiImage } />
            </div>
        )
    }
}

export { ImageGraffitiPreview }