import React from 'react'

class IndicatorPositionPointMarker extends React.Component {

    render(){
        return(
            <div 
                style = {{
                    position: "absolute",
                    bottom: "0px",
                    width : "6px",
                    height : "6px",
                    background: "#373737",
                    boxShadow : "0 1px 1px 0 rgba(0,0,0,0.52)",
                    left: "50%",
                    transform : "translate(-50%,0)",
                    borderRadius : "50%"
                }}
            >
            </div>
        )

    }
}

export { IndicatorPositionPointMarker }

