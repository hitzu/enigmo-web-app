import React from 'react';
import ProtectedRouteMap from './utils/ProtectedRouteMap.route'
import { MapForMobile } from './containers/mapsForMobile'
import { MapsCluster } from './containers/mapsCluster'
import { welcomeScreen } from './containers/welcomeScreen'
import { Route, Switch } from 'react-router-dom'


const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path = "/" component  = {welcomeScreen} />
        <ProtectedRouteMap exact path = '/mapCluster/:lat?/:lng?' component = { MapsCluster } MapsCluster />
        <ProtectedRouteMap exact path = '/mapForMobile/:lat?/:lng?' component = { MapForMobile } mapsForMobile />
        <Route path = "*" component = { () => "404 NOT FOUND"} ></Route>
      </Switch>
      {/* <enigmoAdmin></enigmoAdmin> */}
    </main>   
  )
}

export default App;
