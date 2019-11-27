import React from 'react'
import PropTypes from 'prop-types'
import { CustomUserPicture } from '../userComponents'

class MarkerCustomUserPicture extends React.Component {

    render(){

        const { userPicture } = this.props;
        
        return(
            <div 
                style = {{
                    width : "46px",
                    height : "57px",
                    backgroundColor : "green"
                }}
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

