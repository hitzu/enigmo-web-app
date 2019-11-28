import React from 'react'
import PropTypes from 'prop-types'
import { SnifferCardMarkerNotSelected, SnifferCardMarkerSelected } from "./SnifferCardState"

class SnifferCardMarkerContainer extends React.Component {

    static propTypes = {
        locationCard : PropTypes.object.isRequired,
        pictureThumbnailURL: PropTypes.string.isRequired,
        pictureURLDescription : PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelected : false
        };
    }


    componentWillUpdate(nextProps){
        if (nextProps.disselect && this.state.isSelected) {
            this.setState({isSelected:false})
        }
    }

    selectStamp = () => { 
        this.props.wasSelected()
        this.setState( (state) => {
            return { isSelected : true } 
        })
    }

    hidePreviewLocationCard() {
        this.setState( (state) => {
            return { isSelected : false } 
        })
    }

    getElementByState(){
        return !this.state.isSelected ? 
        <SnifferCardMarkerNotSelected 
            selectLocationCard = { () => {this.selectStamp(this.props.locationCard._id)} }
            locationCard = {this.props.locationCard}
        ></SnifferCardMarkerNotSelected>
        :
        <SnifferCardMarkerSelected 
            locationCard = {this.props.locationCard}
        ></SnifferCardMarkerSelected>
    }

    render(){


        return(
            <>
                { this.getElementByState() }
            </>    
        )
    }
}

export { SnifferCardMarkerContainer }