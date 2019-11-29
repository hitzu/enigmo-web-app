import React from 'react'
import PropTypes from 'prop-types'
import { SnifferCardMarkerNotSelected, SnifferCardMarkerSelected } from "./SnifferCardState"

class SnifferCardMarkerContainer extends React.Component {

    static propTypes = {
        snifferCard : PropTypes.object.isRequired,
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
            selectStamp = { () => {this.selectStamp(this.props.snifferCard._id)} }
            snifferCard = {this.props.snifferCard}
        ></SnifferCardMarkerNotSelected>
        :
        <SnifferCardMarkerSelected 
            snifferCard = {this.props.snifferCard}
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