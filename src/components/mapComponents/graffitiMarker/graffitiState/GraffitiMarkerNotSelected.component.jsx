import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture } from '../../'

class GraffitiMarkerNotSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired
    };

    render (){

        const { graffiti } = this.props
        console.log("imageData", graffiti.idUser)
        return (
            <MarkerCustomUserPicture 
                userPicture = { graffiti.idUser }
            >
            </MarkerCustomUserPicture>
        )
    }
}

export { GraffitiMarkerNotSelected }