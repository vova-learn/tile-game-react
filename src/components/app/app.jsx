import '../../scss/style.scss';

import React from 'react';
import {Route, Switch} from 'react-router';
import {AppRoute} from '../../const';

import MainScreen from '../pages/main-screen';
import GameScreen from '../pages/game-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import GameRoute from '../game-route/game-route';

const App = () => {
  return (
    <Switch>
      <GameRoute
        exact
        path={AppRoute.GAME}
        render={() => <GameScreen />}
      />

      <Route exact path={AppRoute.ROOT}>
        <MainScreen />
      </Route>

      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
};

export default App;
