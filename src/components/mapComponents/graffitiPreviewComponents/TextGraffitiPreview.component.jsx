import React from 'react'
import PropTypes from 'prop-types'

class TextGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiText : PropTypes.string.isRequired
    }

    render(){

        const { graffitiText } = this.props
        console.log("desde el graffitiText", graffitiText)
        return(
            <div style = {{
                height:'100%', 
                width:'100%',
                backgroundColor: 'green'
            }}> 
                <h1>{ graffitiText }</h1>
            </div>
        )
    }
}

export { TextGraffitiPreview }