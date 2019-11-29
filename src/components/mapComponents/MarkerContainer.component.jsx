import React from 'react'
import PropTypes from 'prop-types'
import { GraffitiMarkerContainer } from './graffitiMarker'
import { LocationCardMarkerContainer } from './locationCardMarker'
import { SnifferCardMarkerContainer } from './SnifferCardMarker'

class MarkerContainer extends React.Component {

    static propTypes = {
        element : PropTypes.object.isRequired,
        typeToElement : PropTypes.string.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            hideAllMarkers:false
        };
    }

    wasSelected = ()=> {
        this.props.wasSelected()
        
    }
    hidePreviewMarker = ()=>{
        this.setState({hideAllMarkers : true})
    }
    getContentByElementType(elementType, element){
        switch (elementType){
            case "locationsCards" :
            return (
                <LocationCardMarkerContainer
                    locationCard = { element }
                    disselect = {this.state.hideAllMarkers}
                    wasSelected = {this.wasSelected}
                ></LocationCardMarkerContainer>
            )
            case "SnifferCards" :
            return (
                <SnifferCardMarkerContainer 
                    snifferCard = { element }
                    disselect = {this.state.hideAllMarkers}
                    wasSelected = {this.wasSelected}
                ></SnifferCardMarkerContainer>
            )
                
            case "graffiti" :
            return (
                <GraffitiMarkerContainer 
                    graffiti = { element } 
                    wasSelected = {this.wasSelected}
                    disselect = {this.state.hideAllMarkers}>
                </GraffitiMarkerContainer>
            )
        }
    }

    render(){

        const { element, typeToElement } = this.props;
        console.log(typeToElement, element)
        return(
            <div 
                style = {{ 
                    display: "inline-block"
                }}>
                { this.getContentByElementType(typeToElement, element) }
            </div>
        )

    }
}

export { MarkerContainer }

