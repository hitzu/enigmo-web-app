import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../../../userComponents'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'
import { ContainerRepresentativeGraffitiType } from './'
import { ImageGraffitiPreview } from "./graffitiPreviewComponents"

class GraffitiMarkerSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired
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
                graffitiImage = {graffiti.interaction.mediaUrl}
            ></ImageGraffitiPreview>
            case "stiker": 
            return "linear-gradient(0deg, #FF5900 25%, #FFE900 100%, #FFEB00 100%)"
        }
    }

    render (){

        const { graffiti, emitOpenGraffiti } = this.props

        return (
            <div >
                <div style = {{
                    border : "2px solid blue",
                }}
                >
                    { this.getComponentByType(graffiti) }
                </div>
                <>
                    <div style = {{
                        display : "flex",
                        justifyContent : "center"
                    }}>    
                        <CustomUserPicture
                            pictureURL = { graffiti.idUser.pictureURL }
                            pictureURLDescription = { graffiti.idUser.pictureURLDescription }
                            width = "46px"
                            height = "46px"
                        >
                        </CustomUserPicture>
                        <ContainerRepresentativeGraffitiType
                                graffitiType = {graffiti.interaction.contentType}
                                isGraffitiSelected = {true}
                                parentWidth = {46}
                        />
                                
                    </div>
                    <IndicatorPositionPointMarker/>
                </>
            </div>
        )
    }
}

export { GraffitiMarkerSelected }