import React from 'react'
import PropTypes from 'prop-types'
import { GraffitiMarkerContainer } from './graffitiMarker'

class MarkerContainer extends React.Component {

    static propTypes = {
        element : PropTypes.object.isRequired,
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
                <h1>Soy un locations</h1>
            )
            case "SnifferCards" :
            return (
                <h1>Soy un sniffer</h1>
            )
                
            case "graffiti" :
            return (
                <GraffitiMarkerContainer 
                    graffiti = { element.item }
                    mapIsDragging = { this.state.mapIsDragging } >
                </GraffitiMarkerContainer>
            )
        }
    }

    render(){

        const { element } = this.props;

        return(
            <div 
                style = {{ 
                    display: "inline-block",
                }}>
                { this.getContentByElementType(element.typeToElement, element) }
            </div>
        )

    }
}

export { MarkerContainer }

