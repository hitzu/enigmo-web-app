import React from 'react'
import PropTypes from 'prop-types'

export default class GraffitiMarker extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired,
        pictureThumbnailURL: PropTypes.string.isRequired,
        pictureURLDescription : PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            isSelected : false
        };
    }

    getGraffitiContent(){
        return (
            <div>
                jajaja esto retorno :C
            </div>
        )
    }

    

    render(){

        const { graffiti, pictureThumbnailURL, pictureURLDescription } = this.props;
        console.log(this.props.graffiti)
        

        const { isSelected } = this.state;
        console.log(isSelected)

        return(
            
                <div style = 
                    {{ 
                        backgroundImage: `url(${graffiti.idUser.pictureThumbnailURL})`, 
                        backgroundSize : 'cover',
                        height:'100px', 
                        width:'100px',
                        transform : 
                            `translate(calc(${(graffiti.idUser.pictureURLDescription.posX / 2) * 100}px - 50%), calc(${(graffiti.idUser.pictureURLDescription.posY / 2) * 100}px - 50%))
                            scale(${graffiti.idUser.pictureURLDescription.scale})
                            rotate(${graffiti.idUser.pictureURLDescription.rotation}rad)
                            `
                    }}>
                        GraffitiMarker
                </div>
        )
    }
}