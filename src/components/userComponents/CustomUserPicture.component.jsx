import React from 'react'
import PropTypes from 'prop-types'

class CustomUserPicture extends React.Component {

    static propTypes = { 
        pictureURL : PropTypes.string.isRequired,
        pictureURLDescription : PropTypes.object.isRequired
    }

    render(){

        const { pictureURL, pictureURLDescription, width, height } = this.props;

        return(
            <div id = "userImageContainer" style = 
            {{                
                width: width,
                height: height,
                overflow : "hidden",
                borderRadius : "50%",
                borderColor : "white"
            }}>
                <div id="userImage" style = {{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${pictureURL})`, 
                    backgroundSize : 'cover',
                    transform : 
                    `translate(calc(${(pictureURLDescription.posX / 2) * width}px - 50%), calc(${(pictureURLDescription.posY / 2) * height}px - 50%))
                    scale(${pictureURLDescription.scale})
                    rotate(${pictureURLDescription.rotation}rad)
                    `
                }}>
                </div>
            </div>
        )

    }

}

export { CustomUserPicture }