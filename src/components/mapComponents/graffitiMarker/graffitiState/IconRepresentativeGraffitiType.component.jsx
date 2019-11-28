import React from 'react'
import PropTypes from 'prop-types'

import AudioGraffitiIcon from "../../../../assets/AudioGraffitiIcon.png"
import VideoGraffitiIcon from "../../../../assets/VideoGraffitiIcon.png"
import ImageGraffitiIcon from "../../../../assets/ImageGraffitiIcon.png"
import StickerGraffitiIcon from "../../../../assets/StickerGraffitiIcon.png"
import TextGraffitiIcon from "../../../../assets/TextGraffitiIcon.png"

class IconRepresentativeGraffitiType extends React.Component {

    static propTypes = {
        graffitiType : PropTypes.string.isRequired
    };

    getIconByType(graffitiType){
        console.log(graffitiType, "porque entre al getIcon")
        switch (graffitiType) {
            case "audio":
            return `url(${AudioGraffitiIcon})`
            case "video" :
            console.log("entro aqui?")
            return `url(${VideoGraffitiIcon})`
            case "text":
            return `url(${TextGraffitiIcon})`
            case "image":
            return `url(${ImageGraffitiIcon})`
            case "stiker": 
            return `url(${StickerGraffitiIcon})`
        }
    }

    render(){

        const { graffitiType } = this.props
        
        return(
            <div style = {{
                height : "10px",
                width : "10px",
                backgroundImage : this.getIconByType(graffitiType),
                backgroundSize : 'contain',
                backgroundPosition : 'center',
                backgroundRepeat : "no-repeat",
            }}>

            </div>
        )
    }
}

export { IconRepresentativeGraffitiType }