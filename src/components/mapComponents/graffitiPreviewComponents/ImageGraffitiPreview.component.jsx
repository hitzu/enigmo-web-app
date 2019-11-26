import React from 'react'
import PropTypes from 'prop-types'

class ImageGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiDescription : PropTypes.string.isRequired,
        graffitiImage : PropTypes.string.isRequired
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
                <img src = { graffitiImage } />
            </div>
        )
    }
}

export { ImageGraffitiPreview }