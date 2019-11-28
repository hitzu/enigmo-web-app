import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'

class LocationCardMarkerNotSelected extends React.Component {

    static propTypes = {
        locationCard : PropTypes.object.isRequired,
        selectLocationCard : PropTypes.func.isRequired
    };

    render (){

        const { locationCard, selectLocationCard } = this.props

        return (
            <>
                <MarkerCustomUserPicture 
                    selectElement = { selectLocationCard }
                    userPicture = { locationCard.idUser }>        
                </MarkerCustomUserPicture>  
                <IndicatorPositionPointMarker/>
            </>
        )
    }
}

export { LocationCardMarkerNotSelected }