import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {ActionCreator} from '../../store/actions';
import {getHardLevelStatus} from '../../utils';
import {AppRoute, ButtonName, GameColor, GameDifficult} from '../../const';

import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import Spinner from '../spinner/spinner';
import {getGameData, getGameDataGenerateStatus} from '../../store/selectors';


const MainScreen = ({gameData, isHardLevel, isGameDataGenerate, onGameDataGenerate, onGameDifficultChange, onHardLevelSet}) => {

  const [isChooseGame, setChooseGame] = useState(false);

  useEffect(() => {
    if (!isGameDataGenerate || gameData.length !== GameDifficult.NORMAL) {
      onGameDataGenerate(GameDifficult.NORMAL);
      onHardLevelSet(getHardLevelStatus());
    }

  }, [isGameDataGenerate]);

  if (!isGameDataGenerate) {
    return <Spinner />;
  }

  const getTileStyle = (color, alpha = ``) => {
    return {
      backgroundColor: `${color}${alpha}`,
      boxShadow: `${GameColor.BOX_SHADOW} ${color}${alpha}`,
    };
  };

  const handleStartGameButtonClick = (evt) => {
    evt.preventDefault();
    setChooseGame(true);
  };

  const handleNormalStartButtonClick = () => {
    onGameDifficultChange(GameDifficult.NORMAL);
    onHardLevelSet(false);
  };

  const handleHardStartButtonClick = (evt) => {
    if (!isHardLevel) {
      evt.preventDefault();
      return;
    }

    onGameDifficultChange(GameDifficult.HARD);
  };

  const getTileButtonJsx = (item) => (
    <button
      className={`tile__button tile__button--blur`}
      style={getTileStyle(item.color, GameColor.ALPHA_POWER)}
      disabled={true}
    >
      <svg className="tile__svg" viewBox="0 0 512 512">
        <use xlinkHref={`#${item.name}`} />
      </svg>
    </button>
  );

  const getLinkJsx = (colorIndex, handler, buttonName) => (
    <Link
      to={AppRoute.GAME}
      className="game__button"
      style={getTileStyle(gameData[colorIndex].color)}
      onClick={handler}
    >
      {buttonName}
    </Link>
  );


  return (
    <React.Fragment>
      <Header />

      <main className="main">
        <h1 className="visually-hidden">Развивающая игра «Tile Game»</h1>
        <section className="game">
          <div className="game__container container">
            <div className="game__about">
              <h2 className="game__title">Tile Game</h2>
              <p className="game__description">Суть игры «Tile Game» найти все пары плиток и собрать весь пазл. В игре два уровня сложности: Normal —  плитки 4х4 и Hard —  6х4. В начале игры плитки открыты на 5 секунд, в режиме Hard —  10 секунд, затем плитки скрываются —  игра началась.  На одну игру даётся три жизни — три попытки сделать ошибку, по истечению жизней игра заканчивается с возможностью переиграть. После прохождения режима Normal открывается Hard. Приятной игры 🕹️😊</p>
            </div>

            <div className="game__block game__block--main">
              <div className="game__tiles game__tiles--normal">

                {gameData.map((item, index) => (
                  <div className="tile" key={`${item.name}${index}`}>
                    {getTileButtonJsx(item)}
                  </div>
                ))}

                <div className={`game__preview game__preview--active`}>
                  {!isChooseGame && getLinkJsx(0, handleStartGameButtonClick, ButtonName.START)}

                  {isChooseGame &&
                    <div className="game__choose">
                      {getLinkJsx(1, handleNormalStartButtonClick, ButtonName.NORMAL)}

                      <Link
                        to={AppRoute.GAME}
                        className={`game__button ${!isHardLevel && `game__button--disabled`}`}
                        style={getTileStyle(gameData[2].color)}
                        onClick={handleHardStartButtonClick}
                      >
                        {`${isHardLevel ? ButtonName.HARD : ButtonName.HARD_DISABLED}`}
                      </Link>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
};

MainScreen.propTypes = {
  gameData: PropTypes.array.isRequired,
  isHardLevel: PropTypes.bool.isRequired,
  isGameDataGenerate: PropTypes.bool.isRequired,
  onGameDataGenerate: PropTypes.func.isRequired,
  onGameDifficultChange: PropTypes.func.isRequired,
  onHardLevelSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameData: getGameData(state),
    isHardLevel: getHardLevelStatus(state),
    isGameDataGenerate: getGameDataGenerateStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGameDataGenerate: (gameDifficult) => {
      dispatch(ActionCreator.generateGameData(gameDifficult));
    },
    onGameDifficultChange: (gameDifficult) => {
      dispatch(ActionCreator.changeGameDifficult(gameDifficult));
    },
    onHardLevelSet: (isHardLevel) => {
      dispatch(ActionCreator.setHardLevel(isHardLevel));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
