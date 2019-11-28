import React from 'react'
import PropTypes from 'prop-types'

class SnifferCardMarkerContainer extends React.Component {

    static propTypes = {
        pictureThumbnailURL: PropTypes.string.isRequired,
        pictureURLDescription : PropTypes.object.isRequired
      };

    render(){

        const { pictureThumbnailURL, pictureURLDescription } = this.props;
        console.log(this.props)

        return(
            <div style = 
                {{ 
                    backgroundImage: `url(${pictureThumbnailURL})`, 
                    backgroundSize : 'cover',
                    height:'100px', 
                    width:'100px',
                    transform : 
                        `translate(calc(${(pictureURLDescription.posX / 2) * 100}px - 50%), calc(${(pictureURLDescription.posY / 2) * 100}px - 50%))
                        scale(${pictureURLDescription.scale})
                        rotate(${pictureURLDescription.rotation}rad)
                        `
                }}>
                    SnifferCardMarker
            </div>
        )
    }
}

export { SnifferCardMarkerContainer }