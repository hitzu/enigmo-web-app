import React from 'react'
import PropTypes from 'prop-types'
import { GraffitiMarkerContainer } from './graffitiMarker'
import { LocationCardMarkerContainer } from './locationCardMarker'
import { SnifferCardMarkerContainer } from './SnifferCardMarker'

class MarkerContainer extends React.Component {

    static propTypes = {
        element : PropTypes.object.isRequired,
        typeToElement : PropTypes.string.isRequired,
        mapIsDragging : PropTypes.bool.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            mapIsDragging : this.props.mapIsDragging
        };
    }

    getContentByElementType(elementType, element){
        switch (elementType){
            case "locationsCards" :
            return (
                <LocationCardMarkerContainer
                        locationCard = { element }
                >

                </LocationCardMarkerContainer>
            )
            case "SnifferCards" :
            return (
                <SnifferCardMarkerContainer>Soy un sniffer

                </SnifferCardMarkerContainer>
            )
                
            case "graffiti" :
                console.log("markerContainer", element)
            return (
                <GraffitiMarkerContainer 
                    graffiti = { element } >
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

