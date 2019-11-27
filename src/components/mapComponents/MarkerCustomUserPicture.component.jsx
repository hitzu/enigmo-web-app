import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../userComponents'
import { IndicatorPositionPointMarker } from './'

class MarkerCustomUserPicture extends React.Component {

    render(){

        const { userPicture, selectGraffiti } = this.props;
        
        return(
            <div 
                style = {{
                    display : "inline-block"
                }}
                onClick={selectGraffiti}
            >
                <CustomUserPicture
                    pictureURL = { userPicture.pictureURL }
                    pictureURLDescription = { userPicture.pictureURLDescription }
                    width = "46px"
                    height = "46px"
                ></CustomUserPicture>
            </div>
        )

    }
}

export { MarkerCustomUserPicture }

