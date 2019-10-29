import React from 'react';
import ProtectedRouteMap from './utils/ProtectedRouteMap.route'
import { mapForMobile } from './mapsForMobile'
import { welcomeScreen } from './welcomeScreen'
import { Route, Switch } from 'react-router-dom'


const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path = "/" component  = {welcomeScreen} />
        <ProtectedRouteMap exact path = '/mapForMobile' component = { mapForMobile } mapsForMobile />
        <Route path = "*" component = { () => "404 NOT FOUND"} ></Route>
      </Switch>
      {/* <enigmoAdmin></enigmoAdmin> */}
    </main>   
  )
}

export default App;
