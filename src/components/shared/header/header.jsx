import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import logoGithub from './../../../img/github.svg';
import {ActionCreator} from '../../../store/actions';
import {AppRoute, GameColor} from '../../../const';

const LOGO_IMAGES = [`heart`, `facebook`, `star`, `instagram`];

const Header = ({onResetGameDataGenerateStatus}) => {
  const handleLogoClick = () => {
    onResetGameDataGenerateStatus();
  };

  const getLogoSvgJsx = (item, index) => (
    <svg
      key={item}
      className="logo__svg"
      viewBox="0 0 512 512"
      style={{backgroundColor: `${GameColor.DEFAULT_COLORS[index]}${GameColor.ALPHA_POWER}`}}
    >
      <use xlinkHref={`#${item}`} />
    </svg>
  );

  return (
    <header className="header">
      <nav className="header__navigation container">
        <Link className="logo" to={AppRoute.ROOT} onClick={handleLogoClick}>
          {LOGO_IMAGES.map((item, index) => getLogoSvgJsx(item, index))}
        </Link>

        <a className="social" href="https://github.com/vovapipko/tile-game-react">
          <img
            className="social__image social__image--github"
            src={logoGithub}
            alt="Логотип Github"
          />
        </a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  onResetGameDataGenerateStatus: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetGameDataGenerateStatus: () => {
      dispatch(ActionCreator.resetGameDataGenerateStatus());
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
