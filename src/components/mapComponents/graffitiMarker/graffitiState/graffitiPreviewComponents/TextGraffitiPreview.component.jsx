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
                display: "flex",
                minHeight:'38px', 
                maxWidth:'212px',
                wordWrap: "break-word",
                backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
                borderRadius: "19px",
                fontFamily: "Okomito-Medium",
                fontSize: "16px",
                color: "#000000",
                letterSpacing: "-0.32px",
                justifyContent : "center",
                alignItems: "center"
            }}> 
                <div style = {{
                    padding: "10px 12px 10px 12px"
                }}>
                    { graffitiText }
                </div>
            </div>
        )
    }
}

export { TextGraffitiPreview }