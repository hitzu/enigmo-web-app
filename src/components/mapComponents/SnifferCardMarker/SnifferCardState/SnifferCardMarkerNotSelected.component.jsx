import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'

class SnifferCardMarkerNotSelected extends React.Component {

    static propTypes = {
        snifferCard : PropTypes.object.isRequired,
        selectSnifferCard : PropTypes.func.isRequired
    };

    render (){
 
        const { snifferCard, selectStamp } = this.props
        console.log("desde el snifferCardNoSelected", snifferCard)
 
        return (
            <>
                <MarkerCustomUserPicture 
                    selectElement = { selectStamp }
                    userPicture = { snifferCard.idStamper }>        
                </MarkerCustomUserPicture>  
                <IndicatorPositionPointMarker/>
            </>
        )
    }
}

export { SnifferCardMarkerNotSelected }