import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
const confetti = require(`canvas-confetti`);

import {ActionCreator} from '../../store/actions';
import {getSvgCollection} from '../../utils';
import {AppRoute, ButtonName, GameColor, GameDifficult, GameMessage, GameProcess} from '../../const';

import Header from '../shared/header/header';
import Footer from '../shared/footer/footer';
import Spinner from '../spinner/spinner';
import {getGameData, getGameDataGenerateStatus, getGameDifficult, getHardLevelStatus} from '../../store/selectors';

const GameScreen = ({gameData, gameDifficult, isHardLevel, isGameDataGenerate, onGameDataGenerate, onGameDifficultChange, onGameDataGenerateStatusReset, onHardLevelSet}) => {
  const history = useHistory();

  const [activeTile, setActiveTile] = useState({
    isOpen: true,
    index: null,
    openTiles: [],
  });

  const [life, setLife] = useState({
    count: 0,
    isEnd: false,
  });

  const [isGameWin, setGameWin] = useState(false);

  useEffect(() => {
    if (!isGameDataGenerate) {
      onGameDataGenerate(gameDifficult);
      setLife({count: GameProcess.LIFE_COUNT, isEnd: false});
      setGameWin(false);

      let timer;
      const time = gameDifficult === GameDifficult.NORMAL ? GameProcess.TIMEOUT.NORMAL : GameProcess.TIMEOUT.HARD;
      timer = setTimeout(async () => {
        await setActiveTile({...activeTile, isOpen: false, openTiles: [], index: null});
        clearTimeout(timer);
      }, time);
    }

    const isNormalGameWin = activeTile.openTiles.length === gameData.length &&
    gameDifficult !== GameDifficult.HARD && isGameDataGenerate;
    const isHardGameWin = activeTile.openTiles.length === gameData.length &&
    gameDifficult === GameDifficult.HARD && isGameDataGenerate;

    if (isNormalGameWin || isHardGameWin) {
      confetti.default();
      setGameWin(true);
      setActiveTile({index: null, openTiles: [], isOpen: true});
    }

  }, [isGameDataGenerate, activeTile.openTiles]);

  if (!isGameDataGenerate) {
    return <Spinner />;
  }

  const handleTileButtonClick = ({currentTarget}) => {
    if (activeTile.isOpen) {
      return;
    }
    const index = currentTarget.name.replace(/[a-zA-Z/-]/g, ``) - 1;
    const isOpenTile = activeTile.openTiles.includes(index);
    const isFirstCoupleTile = activeTile.index === null;
    const isSecondCoupleTile = !isFirstCoupleTile && gameData[activeTile.index].id === gameData[index].id;

    if (isFirstCoupleTile && !isOpenTile) {
      setActiveTile({index, openTiles: [...activeTile.openTiles, index]});
    } else if (isSecondCoupleTile && !isOpenTile) {
      setActiveTile({index: null, openTiles: [...activeTile.openTiles, index]});
    } else if (!isSecondCoupleTile && !isOpenTile) {
      setLife({...life, count: --life.count});

      if (life.count <= 0) {
        setLife({...life, isEnd: true});
        setActiveTile({...activeTile, isOpen: true});
      }
    }
  };

  const getTileStyle = (color, isOpen, isActiveTile, alpha = ``) => {
    if (isOpen || isActiveTile) {
      return {
        backgroundColor: `${color}${alpha}`,
        boxShadow: `${GameColor.BOX_SHADOW} ${color}${alpha}`,
      };
    } else {
      return {};
    }
  };

  const getMessageJsx = (message) => (
    <p className="game__message">{message}</p>
  );

  const getLinkJsx = (colorIndex, handler, buttonName, isWin = false) => (
    <Link
      className={`game__button ${isWin && `game__button--max-size`}`}
      style={getTileStyle(gameData[colorIndex].color, true, true)}
      onClick={handler}
    >
      {buttonName}
    </Link>
  );

  const getTileSvgJsx = (item, isOpen, isOpenTile) => {
    if (isOpen || isOpenTile) {
      return (
        <svg className="tile__svg" viewBox="0 0 512 512">
          <use xlinkHref={`#${item.name}`} />
        </svg>
      );
    }
    return false;
  };

  const handleReplayButtonClick = () => {
    onGameDataGenerateStatusReset();
  };

  const handleNextLevelButtonClick = () => {
    localStorage.setItem(GameProcess.HARD_NAME_IN_STORAGE, GameProcess.HARD_IS_TRUE_MASK);
    setGameWin(false);
    onHardLevelSet();
    onGameDifficultChange(GameDifficult.HARD);
  };

  const handleGameWinButtonClick = () => {
    onGameDifficultChange(GameDifficult.NORMAL);
    history.push(AppRoute.ROOT);
  };

  return (
    <>
      <Header />
      <section className="game">
        <div className="game__container container">

          <div className="game__block game__block--main">

            <div className={`game__lifes lifes ${(life.isEnd || isGameWin) && `game__lifes--blur`}`}>
              {getSvgCollection(life.count).map((item, index) => (
                <svg key={`${item}${index}`} className="lifes__svg" viewBox="0 0 471.701 471.701">
                  <use href={`#${item}`}></use>
                </svg>
              ))}
            </div>

            <div className={`game__tiles ${isHardLevel ? `game__tiles--hard` : `game__tiles--normal`}`}>

              {gameData.map((item, index) => (
                <div className="tile" key={`${item.name}${index}`}>
                  <button
                    className={`tile__button ${(life.isEnd || isGameWin) && `tile__button--blur`}`}
                    style={getTileStyle(item.color, activeTile.isOpen, activeTile.openTiles.includes(index), GameColor.ALPHA_POWER)}
                    name={`tile-${index + 1}`}
                    onClick={handleTileButtonClick}
                  >

                    {getTileSvgJsx(item, activeTile.isOpen, activeTile.openTiles.includes(index))}
                  </button>
                </div>
              ))}


              <div className={`game__preview ${(life.isEnd || isGameWin) && `game__preview--active`}`}>
                {life.isEnd && getMessageJsx(GameMessage.GAME_OVER)}
                {life.isEnd && getLinkJsx(0, handleReplayButtonClick, ButtonName.REPLAY)}

                {isGameWin &&
                    <>
                      {!isHardLevel && getMessageJsx(GameMessage.LEVEL_WIN)}
                      {!isHardLevel && <div className="game__choose">
                        {getLinkJsx(1, handleReplayButtonClick, ButtonName.REPLAY_WIN)}
                        {getLinkJsx(2, handleNextLevelButtonClick, ButtonName.LEVEL_WIN)}
                      </div>}

                      {isHardLevel && getMessageJsx(GameMessage.GAME_WIN)}
                      {isHardLevel && getLinkJsx(0, handleGameWinButtonClick, ButtonName.GAME_WIN, isGameWin)}
                    </>
                }
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};


GameScreen.propTypes = {
  gameData: PropTypes.array.isRequired,
  gameDifficult: PropTypes.number.isRequired,
  isGameDataGenerate: PropTypes.bool.isRequired,
  isHardLevel: PropTypes.bool.isRequired,
  onGameDataGenerate: PropTypes.func.isRequired,
  onGameDifficultChange: PropTypes.func.isRequired,
  onGameDataGenerateStatusReset: PropTypes.func.isRequired,
  onHardLevelSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameData: getGameData(state),
    gameDifficult: getGameDifficult(state),
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
    onGameDataGenerateStatusReset: () => {
      dispatch(ActionCreator.resetGameDataGenerateStatus());
    },
    onHardLevelSet: () => {
      dispatch(ActionCreator.setHardLevel());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
