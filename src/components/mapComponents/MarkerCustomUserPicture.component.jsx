import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../userComponents'
import { IndicatorPositionPointMarker } from './'

class MarkerCustomUserPicture extends React.Component {

    render(){

        const { userPicture, selectElement } = this.props;
        
        return(
            <div 
                style = {{
                    display : "inline-block"
                }}
                onClick={selectElement}
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

