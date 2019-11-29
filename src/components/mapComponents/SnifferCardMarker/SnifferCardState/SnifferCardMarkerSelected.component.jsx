import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../../../userComponents'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'

class SnifferCardMarkerSelected extends React.Component {

    render (){
        const { snifferCard } = this.props
        return (
            <div >
                <div style = {{
                    height:'256px', 
                    width:'159px',
                    backgroundImage : `url(${snifferCard.idCard.screenshot})`,
                    backgroundSize : "cover",
                    backgroundColor : "black",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.25)",
                    borderRadius: "15px",
                }}> 
                </div>
                <>
                    <div style = {{
                        marginTop : "13px",
                        display : "flex",
                        justifyContent : "center"
                    }}>    
                        <CustomUserPicture
                            pictureURL = { snifferCard.idStamper.pictureURL }
                            pictureURLDescription = { snifferCard.idStamper.pictureURLDescription }
                            width = "46px"
                            height = "46px"
                        >
                        </CustomUserPicture>
                    </div>
                    <IndicatorPositionPointMarker/>
                </>
            </div>
        )
    }
}

export { SnifferCardMarkerSelected }