import React from 'react'
import PropTypes from 'prop-types'

export default class GraffitiMarker extends React.Component {

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
            </div>
        )
    }
}


// import React, { useState, useEffect } from 'react'

// const GraffitiMarker = (props) => {

//     const [pictureThumbnailURL, setPictureThumbnailURL] = useState(props.pictureThumbnailURL)
//     const [pictureURLDescription, setPictureURLDescription] = ({
//         bgColor : "",
//         posX : 1,
//         posY : 1,
//         rotation : 0,
//         scale : 1
//     }) 

//     useEffect( () => {
//         console.log(pictureThumbnailURL)
//         console.log(pictureURLDescription)
//     })

//     return (
        
//         <h1>{pictureThumbnailURL
//             }</h1>
//     )

// }

// export default GraffitiMarker