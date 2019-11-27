import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'
import { IconRepresentativeGraffitiType } from './graffitiPreviewComponents'

class GraffitiMarkerNotSelected extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired,
        selectGraffiti : PropTypes.func.isRequired
    };

    render (){

        const { graffiti, selectGraffiti } = this.props

        return (
            <div >
                <>    
                   <MarkerCustomUserPicture 
                        selectGraffiti = { selectGraffiti }
                        userPicture = { graffiti.idUser }>        
                    </MarkerCustomUserPicture>
                    <IconRepresentativeGraffitiType
                            graffitiType = {graffiti.interaction.contentType}/>
                </>
                <IndicatorPositionPointMarker/>
            </div>
        )
    }
}

export { GraffitiMarkerNotSelected }