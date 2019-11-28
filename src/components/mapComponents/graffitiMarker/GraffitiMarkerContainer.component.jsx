import React from 'react'
import PropTypes from 'prop-types'
import { GraffitiMarkerNotSelected, GraffitiMarkerSelected } from './graffitiState'

class GraffitiMarkerContainer extends React.Component {

    static propTypes = {
        graffiti : PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected : false
        };
    }

    selectGraffiti = () => { 
        this.setState( (state) => {
            return { isSelected : true } 
        })
    }

    hidePreviewGraffiti() {
        this.setState( (state) => {
            return { isSelected : false } 
        })
    }

    getElementByState(){
        return !this.state.isSelected ? 
        <GraffitiMarkerNotSelected 
            selectGraffiti = { () => {this.selectGraffiti(this.props.graffiti._id)} }
            graffiti = {this.props.graffiti}
        ></GraffitiMarkerNotSelected>
        :
        <GraffitiMarkerSelected 
            graffiti = {this.props.graffiti}
        ></GraffitiMarkerSelected>
    }

    render(){

        console.log(this.props.graffiti)
        return (
            <>
                { this.getElementByState() }
            </>
        )
    }
}

export { GraffitiMarkerContainer }