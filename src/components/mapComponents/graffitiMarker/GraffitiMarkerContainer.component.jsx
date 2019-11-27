import React from 'react'
import PropTypes from 'prop-types'
import { GraffitiMarkerNotSelected, GraffitiMarkerSelected } from './graffitiState'

class GraffitiMarkerContainer extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired,
        mapIsDragging : PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected : false,
            mapIsDragging : this.props.mapIsDragging
        };
    }

    selectGraffiti = () => { 
        this.setState( (state) => {
            return { isSelected : true } 
        })
    }

    hidePreviewGraffiti() {
        this.setState( (state) => {
            return { isSelected : false } 
        })
    }

    getElementByState(){
        return !this.state.isSelected ? 
        <GraffitiMarkerNotSelected 
            selectGraffiti = { () => {this.selectGraffiti(this.props.graffiti._id)} }
            graffiti = {this.props.graffiti}
        ></GraffitiMarkerNotSelected>
        :
        <GraffitiMarkerSelected 
            graffiti = {this.props.graffiti}
        ></GraffitiMarkerSelected>
        
    }

    render(){

        console.log(this.props.graffiti)
        return (
            <>
                { this.getElementByState() }
            </>
        )
    }
}

export { GraffitiMarkerContainer }

// import React from 'react'
// import PropTypes from 'prop-types'
// import { TextGraffitiPreview, ImageGraffitiPreview, VideoGraffitiPreview, AudioGraffitiPreview } from './graffitiPreviewComponents'
// import { MarkerCustomUserPicture } from '..'

// class GraffitiMarkerContainer extends React.Component {

//     static propTypes = {
//         graffiti : PropTypes.object.isRequired
//     };
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSelected : false
//         };
//     }

//     getGraffitiContent(graffiti){
//         switch (graffiti.interaction.contentType){
//             case "text" :
//                 return (
//                     <div style = {{
//                         marginTop : "10px",
//                         width : "50px",
//                         height : "20px",
//                         margin : "0 auto",
//                         textAlign : "center"

//                     }}>
//                         <TextGraffitiPreview graffitiText = {graffiti.interaction.description}></TextGraffitiPreview>
//                     </div>
//                 )
//             case "video" : 
//                 console.log("video jajajaja ;C trueno", graffiti)
//                 return (
//                     <div style = {{
//                         marginTop : "10px",
//                         width : "50px",
//                         height : "20px",
//                         margin : "0 auto",
//                         textAlign : "center"

//                     }}>
//                         <VideoGraffitiPreview 
//                             graffitiDescription = { graffiti.interaction.description } 
//                             graffitiVideo = { graffiti.interaction.mediaUrl } >
//                         </VideoGraffitiPreview>
//                     </div>
//                 )
//             case "audio" :
//                     return (
//                         <div style = {{
//                             marginTop : "10px",
//                             width : "500px",
//                             height : "200px",
//                             margin : "0 auto",
//                             textAlign : "center",
//                             backgroundColor : "red"
//                         }}>
//                             <AudioGraffitiPreview 
//                                 graffitiAudio = { graffiti.interaction.mediaUrl } 
//                             ></AudioGraffitiPreview>
//                         </div>
//                     )
//             case "image" :
//                 return (
//                     <div style = {{
//                         marginTop : "10px",
//                         width : "500px",
//                         height : "200px",
//                         margin : "0 auto",
//                         textAlign : "center",
//                         backgroundColor : "red"
//                     }}>
//                         <ImageGraffitiPreview 
//                             graffitiDescription = { graffiti.interaction.description } 
//                             graffitiImage = { graffiti.interaction.mediaUrl } 
//                         ></ImageGraffitiPreview>
//                     </div>
//                 )
//         }
//     }

//     selectGraffiti = () => { 
//         this.setState( (state) => {
//             return { isSelected : true } 
//         })
//     }

//     hidePreviewGraffiti() {
//         this.setState( (state) => {
//             return { isSelected : false } 
//         })
//     }

//     render(){

//         const { graffiti, emitOpenGraffiti } = this.props;
//         const { isSelected } = this.state;

//         return(
//             <div
//             style = {{
//                 height: isSelected ?  '200px' : '100px', 
//                 width: isSelected ?  '200px' : '100px',
//                 overflow : 'hidden',
//                 borderRadius : isSelected ? "0%" : "50%"
//             }}>
//                 {
//                     isSelected ? 
//                     (
//                         <div style = {{
//                             height:'100%', 
//                             width:'100%',
//                         }}
//                         onClick={emitOpenGraffiti}
//                         > 

//                             {this.getGraffitiContent(graffiti)}
                            
//                             <div style = {{
//                                 width: "100px",
//                                 height: "100px",
//                                 position: "absolute",
//                                 left: "50%",
//                                 top: "50%",
//                                 transform: "translate(-50%, -50%)",
//                                 overflow : 'hidden',
//                                 borderRadius: "50%"

//                             }}> 
//                                 <MarkerCustomUserPicture 
//                                     pictureURL = {graffiti.idUser.pictureURL} 
//                                     pictureURLDescription = {graffiti.idUser.pictureURLDescription}>
//                                 </MarkerCustomUserPicture>
//                             </div>
//                         </div>
//                     ) 
//                     : 
//                     (
//                         <div style = {{
//                             width: "100px",
//                             height: "100px",
//                             position: "absolute",
//                             left: "50%",
//                             top: "50%",
//                             transform: "translate(-50%, -50%)"
//                         }}
                        
//                         onClick={this.selectGraffiti}
//                         > 
//                             <MarkerCustomUserPicture 
//                                 pictureURL = {graffiti.idUser.pictureURL} 
//                                 pictureURLDescription = {graffiti.idUser.pictureURLDescription}>
//                             </MarkerCustomUserPicture>
//                         </div>
//                     )
//                 }
//             </div>
//         )
//     }
// }

// export { GraffitiMarkerContainer }