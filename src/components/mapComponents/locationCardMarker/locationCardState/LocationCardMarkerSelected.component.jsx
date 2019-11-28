import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../../../userComponents'
import { MarkerCustomUserPicture, IndicatorPositionPointMarker} from '../../'

class LocationCardMarkerSelected extends React.Component {

    static propTypes = { 
        locationCard : PropTypes.string.isRequired
    }

    render (){

        const { locationCard } = this.props
        console.log("desde el location mark selected", locationCard.idUser)
        return (
            <div >
                <div style = {{
                    height:'256px', 
                    width:'159px',
                    backgroundImage : `url(${locationCard.idCard.screenshot})`,
                    backgroundSize : "cover",
                    // backgroundPosition : "center",
                    // backgroundRepeat : "no-repeat",
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
                            pictureURL = { locationCard.idUser.pictureURL }
                            pictureURLDescription = { locationCard.idUser.pictureURLDescription }
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

export { LocationCardMarkerSelected }