import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, useHistory} from 'react-router';
import {AppRoute} from '../../const';
import {getGameStatus} from '../../store/selectors';

const GameRoute = ({render, exact, path, gameStatus}) => {
  const history = useHistory();

  return (
    <Route exact={exact} path={path} render={(routeProps) => (
      gameStatus ? render(routeProps) : history.push(AppRoute.ROOT)
    )}/>
  );
};

GameRoute.propTypes = {
  render: PropTypes.func.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  gameStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameStatus: getGameStatus(state),
  };
};

export default connect(mapStateToProps, null)(GameRoute);
