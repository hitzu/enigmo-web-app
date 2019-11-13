import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRouteMap = ( {component : Component, ...rest} ) => {
    return (
        <Route {...rest} render = {
            (props) => {
                //if(auth.isAuthenticated()){
                if (true) {
                    console.log("jajajaja xD")
                    return <Component {...props} />
                } else {
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