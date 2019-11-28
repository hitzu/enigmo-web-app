import React from 'react'
import PropTypes from 'prop-types'
import { IconRepresentativeGraffitiType } from './' 

class ContainerRepresentativeGraffitiType extends React.Component {

    static propTypes = {
        graffitiType : PropTypes.string.isRequired
    };

    getGradientByType(graffitiType){
        switch (graffitiType) {
            case "audio":
            return "linear-gradient(0deg, #E60000 38%, #FF8460 100%)"
            case "video" :
            return "linear-gradient(0deg, #622ED0 31%, #BE65FF 98%)"
            case "text":
            return "linear-gradient(0deg, #008305 5%, #55FF59 95%)"
            case "image":
            return "linear-gradient(10deg, #0800FF 1%, #00CEFF 100%)"
            case "stiker": 
            return "linear-gradient(0deg, #FF5900 25%, #FFE900 100%, #FFEB00 100%)"
        }
    }

    render(){

        const { graffitiType } = this.props

        console.log("desde el container representative", graffitiType)
        return(
            <div style = {{
                height : "20px",
                width : "20px",
                borderRadius : "50%",
                backgroundImage : this.getGradientByType(graffitiType),
                position : "absolute",
                bottom: "0px",
                right : "0px"
                
            }}>
                <IconRepresentativeGraffitiType graffitiType = { graffitiType }>
                </IconRepresentativeGraffitiType>
            </div>
        )
    }
}

export { ContainerRepresentativeGraffitiType }