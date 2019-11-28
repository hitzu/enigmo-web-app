import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'
import { ContainerRepresentativeGraffitiType } from './'

class GraffitiMarkerNotSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired,
        selectGraffiti : PropTypes.func.isRequired
    };

    render (){

        const { graffiti, selectGraffiti } = this.props

        return (
            <>
                <>    
                    <MarkerCustomUserPicture 
                        selectElement = { selectGraffiti }
                        userPicture = { graffiti.idUser }>        
                    </MarkerCustomUserPicture>
                    <ContainerRepresentativeGraffitiType
                            graffitiType = {graffiti.interaction.contentType}/>
                </>
                <IndicatorPositionPointMarker/>
            </>
        )
    }
}

export { GraffitiMarkerNotSelected }