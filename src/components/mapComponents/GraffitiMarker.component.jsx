import React from 'react'
import PropTypes from 'prop-types'
import { TextGraffitiPreview, ImageGraffitiPreview, VideoGraffitiPreview } from './graffitiPreviewComponents'
import { CustomPositionUserPicture } from '../userComponents'

export default class GraffitiMarker extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isSelected : false
        };
    }

    getGraffitiContent(graffiti){
        console.log(graffiti.interaction)
        switch (graffiti.interaction.contentType){
            case "text" :
                return (
                    <div style = {{
                        marginTop : "10px",
                        width : "50px",
                        height : "20px",
                        margin : "0 auto",
                        textAlign : "center"

                    }}>
                        <TextGraffitiPreview graffitiText = {graffiti.interaction.description}></TextGraffitiPreview>
                    </div>
                )
            break;
            case "video" : 
                console.log("video jajajaja ;C trueno", graffiti)
                return (
                    <div style = {{
                        marginTop : "10px",
                        width : "50px",
                        height : "20px",
                        margin : "0 auto",
                        textAlign : "center"

                    }}>
                        <VideoGraffitiPreview 
                            graffitiDescription = { graffiti.interaction.description } 
                            graffitiVideo = { graffiti.interaction.mediaUrl } >
                        </VideoGraffitiPreview>
                    </div>
                )
            break;
            case "audio" :
            break;
            case "image" :
                return (
                    <div style = {{
                        marginTop : "10px",
                        width : "500px",
                        height : "200px",
                        margin : "0 auto",
                        textAlign : "center",
                        backgroundColor : "red"
                    }}>
                        <ImageGraffitiPreview 
                            graffitiDescription = { graffiti.interaction.description } 
                            graffitiImage = { graffiti.interaction.mediaUrl } 
                        ></ImageGraffitiPreview>
                    </div>
                )
            break;
        }
    }

    render(){

        const { graffiti } = this.props;
        console.log(this.props.graffiti)
        

        const { isSelected } = this.state;
        console.log(isSelected)

        return(
            <div
            style = {{
                height: isSelected ?  '200px' : '100px', 
                width: isSelected ?  '200px' : '100px',
                overflow : 'hidden',
                borderRadius : isSelected ? "0%" : "50%"
            }}>
                {
                    isSelected ? 
                    (
                        <div style = {{
                            height:'100%', 
                            width:'100%',
                        }}> 

                            {this.getGraffitiContent(graffiti)}
                            
                            <div style = {{
                                width: "100px",
                                height: "100px",
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                overflow : 'hidden',
                                borderRadius: "50%"

                            }}> 
                                <CustomPositionUserPicture 
                                    pictureURL = {graffiti.idUser.pictureURL} 
                                    pictureURLDescription = {graffiti.idUser.pictureURLDescription}>
                                </CustomPositionUserPicture>
                            </div>
                        </div>
                    ) 
                    : 
                    (
                        <div style = {{
                            width: "100px",
                            height: "100px",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}> 
                            <CustomPositionUserPicture 
                                pictureURL = {graffiti.idUser.pictureURL} 
                                pictureURLDescription = {graffiti.idUser.pictureURLDescription}>
                            </CustomPositionUserPicture>
                        </div>
                    )
                }
            </div>
        )
    }
}