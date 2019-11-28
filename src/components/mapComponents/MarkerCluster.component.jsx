import React from 'react'
import PropTypes from 'prop-types'

class MarkerCluster extends React.Component {

    static propTypes = {
        numberElements : PropTypes.number.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            numberElements : 0
        };
    }

    getColor(numberElementsInCluster){
        if ( numberElementsInCluster <= 15 ){
            return "rgba(4,36,166,0.75)"
        }
        else if( numberElementsInCluster > 15 && numberElementsInCluster <= 25){
            return "rgba(144,206,231,0.75)"
        }
        else if( numberElementsInCluster > 25 && numberElementsInCluster <= 35){
            return "rgba(251,172,1,0.75)"
        }
        else{
            return "rgba(244,47,1,0.75)"
        }
    }

    render(){

        const { numberElements } = this.props

        return(
            <div 
                style = {{ 
                    width : '40px',
                    height : '40px',
                    borderRadius : '20px',
                    border: "2px solid #fff",
                    backgroundColor : this.getColor(numberElements),
                    color : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                 }}>
                {numberElements}
            </div>
        )

    }
}

export { MarkerCluster }

