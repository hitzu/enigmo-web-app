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
            <h1>Soy un Sniffer card NO seleccionado</h1>
        )
    }
}

export { SnifferCardMarkerNotSelected }