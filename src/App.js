import React from 'react';
import ProtectedRouteMap from './utils/ProtectedRouteMap.route'
import { ClusterMap } from './containers/clusterMap'
import { HeatMap } from './containers/heatMap'
import { welcomeScreen } from './containers/welcomeScreen'
import { Route, Switch } from 'react-router-dom'


const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path = "/" component  = {welcomeScreen} />
        <ProtectedRouteMap exact path = '/clusterMap/:lat?/:lng?/:token?' component = { ClusterMap } ClusterMap />
        <ProtectedRouteMap exact path = '/heatMap/:lat?/:lng?/:token?' component = { HeatMap } HeatMap />
        <Route path = "*" component = { () => "404 NOT FOUND"} ></Route>
      </Switch>
    </main>   
  )
}

export default App;
