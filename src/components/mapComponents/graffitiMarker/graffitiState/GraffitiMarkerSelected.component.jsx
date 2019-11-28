import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../../../userComponents'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'
import { ContainerRepresentativeGraffitiType } from './'
import { ImageGraffitiPreview, TextGraffitiPreview, VideoGraffitiPreview, AudioGraffitiPreview, StikerGraffitiPreview } from "./graffitiPreviewComponents"

class GraffitiMarkerSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired
    };

    getComponentByType(graffiti){
        switch (graffiti.interaction.contentType) {
            case "audio":
            return <AudioGraffitiPreview
                graffitiAudio = {graffiti.interaction.mediaUrl}
            ></AudioGraffitiPreview>
            case "video" :
            return <VideoGraffitiPreview
                graffitiVideo = {graffiti.interaction.mediaUrl}
            ></VideoGraffitiPreview>
            case "text":
            return <TextGraffitiPreview
                graffitiText = {graffiti.interaction.description}
            ></TextGraffitiPreview>
            case "image":
            return <ImageGraffitiPreview
                graffitiImage = {graffiti.interaction.mediaUrl}
            ></ImageGraffitiPreview>
            case "stiker": 
            return <StikerGraffitiPreview
                graffitiStiker = {graffiti.interaction.mediaUrl}
        ></StikerGraffitiPreview>
        }
    }

    render (){

        const { graffiti, emitOpenGraffiti } = this.props

        return (
            <div >
                <div>
                    { this.getComponentByType(graffiti) }
                </div>
                <>
                    <div style = {{
                        marginTop : "13px",
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