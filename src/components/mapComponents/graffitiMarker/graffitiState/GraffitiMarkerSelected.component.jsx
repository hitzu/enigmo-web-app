import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'
import { ContainerRepresentativeGraffitiType } from './'
import { ImageGraffitiPreview } from "./graffitiPreviewComponents"

class GraffitiMarkerSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired,
        emitOpenGraffiti : PropTypes.func.isRequired
    };

    getComponentByType(graffiti){
        switch (graffiti.interaction.contentType) {
            case "audio":
            return "linear-gradient(0deg, #E60000 38%, #FF8460 100%)"
            case "video" :
            return "linear-gradient(0deg, #622ED0 31%, #BE65FF 98%)"
            case "text":
            return "linear-gradient(0deg, #008305 5%, #55FF59 95%)"
            case "image":
            return <ImageGraffitiPreview
                graffitiDescription = {graffiti.interaction.description}
                graffitiImage = {graffiti.interaction.mediaUrl}
            ></ImageGraffitiPreview>
            case "stiker": 
            return "linear-gradient(0deg, #FF5900 25%, #FFE900 100%, #FFEB00 100%)"
        }
    }

    render (){

        const { graffiti, emitOpenGraffiti } = this.props

        return (
            <div 
            onClick = {emitOpenGraffiti} >
                { this.getComponentByType(graffiti) }
                <div style = {{
                    display : "flex",
                    justifContent: "center"
                }}>
                    <div style = {{
                        width : "46px"
                    }}>    
                        <MarkerCustomUserPicture 
                            selectElement = { emitOpenGraffiti }
                            userPicture = { graffiti.idUser }>        
                        </MarkerCustomUserPicture>
                        <ContainerRepresentativeGraffitiType
                                graffitiType = {graffiti.interaction.contentType}/>
                    </div>
                    <IndicatorPositionPointMarker/>
                </div>
            </div>
        )
    }
}

export { GraffitiMarkerSelected }