import React from 'react';
import ProtectedRouteMap from './utils/ProtectedRouteMap.route'
import { MapForMobile } from './mapsForMobile'
import { welcomeScreen } from './welcomeScreen'
import { Route, Switch } from 'react-router-dom'


const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path = "/" component  = {welcomeScreen} />
        <ProtectedRouteMap exact path = '/mapForMobile' component = { MapForMobile } mapsForMobile />
        <Route path = "*" component = { () => "404 NOT FOUND"} ></Route>
      </Switch>
      {/* <enigmoAdmin></enigmoAdmin> */}
    </main>   
  )
}

export default App;
