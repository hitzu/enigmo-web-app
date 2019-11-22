import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRouteMap = ( {component : Component, ...rest} ) => {
    return (
        <Route {...rest} render = {
            (props) => {
                console.log("jajatls",props.match.params.token)
                if( props.match.params.token ){
                // if (true) {
                    console.log("jajajaja xD")
                    return <Component {...props} />
                } else {
                    console.log("so sad")
                    return (
                        <Redirect to = {
                            {
                                pathname : "/",
                                state : {
                                    from : props.location
                                }
                            }
                        } />
                    )
                }
            }
        }/>
    )
}

export default ProtectedRouteMap