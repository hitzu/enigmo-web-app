import React from 'react'
import PropTypes from 'prop-types'
import { LocationCardMarkerNotSelected, LocationCardMarkerSelected } from "./locationCardState"

class LocationCardMarkerContainer extends React.Component {

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

    selectLocationCard = () => { 
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
        <LocationCardMarkerNotSelected 
            selectLocationCard = { () => {this.selectLocationCard(this.props.locationCard._id)} }
            locationCard = {this.props.locationCard}
        ></LocationCardMarkerNotSelected>
        :
        <LocationCardMarkerSelected 
            locationCard = {this.props.locationCard}
        ></LocationCardMarkerSelected>
    }

    render(){
        return(
            <>
                { this.getElementByState() }
            </>    
        )
    }
}

export {LocationCardMarkerContainer}