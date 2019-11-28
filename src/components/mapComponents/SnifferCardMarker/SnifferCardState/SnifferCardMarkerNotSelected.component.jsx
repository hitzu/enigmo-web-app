import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'

class SnifferCardMarkerNotSelected extends React.Component {

    static propTypes = {
        snifferCard : PropTypes.object.isRequired,
        selectSnifferCard : PropTypes.func.isRequired
    };

    render (){
 
         const { snifferCard, selectSnifferCard } = this.props
 
        return (
            <>
                <MarkerCustomUserPicture 
                    selectElement = { selectSnifferCard }
                    userPicture = { snifferCard.idUser }>        
                </MarkerCustomUserPicture>  
                <IndicatorPositionPointMarker/>
            </>
        )
    }
}

export { SnifferCardMarkerNotSelected }