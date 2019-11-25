import React from 'react'
import PropTypes from 'prop-types'

class CustomPositionUserPicture extends React.Component {

    static propTypes = { 
        pictureURL : PropTypes.string.isRequired,
        pictureURLDescription : PropTypes.object.isRequired
    }

    render(){

        const { pictureURL, pictureURLDescription } = this.props;

        return(
            <div style = 
            {{ 
                backgroundImage: `url(${pictureURL})`, 
                backgroundSize : 'cover',
                width: "100%",
                height: "100%",
                transform : 
                    `translate(calc(${(pictureURLDescription.posX / 2) * 100}px - 50%), calc(${(pictureURLDescription.posY / 2) * 100}px - 50%))
                    scale(${pictureURLDescription.scale})
                    rotate(${pictureURLDescription.rotation}rad)
                    `
            }}>
            </div>
        )

    }

}

export { CustomPositionUserPicture }