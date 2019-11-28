import React from 'react'
import PropTypes from 'prop-types'

class StikerGraffitiPreview extends React.Component {

    static propTypes = { 
        graffitiImage : PropTypes.string.isRequired
    }

    render(){

        const { graffitiStiker } = this.props

        return(
            <div style = {{
                background: "rgba(180,180,180,0.26)",
                borderRadius: "15px",
                height:'256px', 
                width:'159px',
                backgroundImage : `url(${graffitiStiker})`,
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

export { StikerGraffitiPreview }