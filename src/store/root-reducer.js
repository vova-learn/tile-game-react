import {GameDifficult} from "../const";
import {getHardLevelStatus} from "../utils";
import {ActionType} from "./actions";

const initialState = {
  gameData: [],
  isGameDataGenerate: false,
  isHardLevel: getHardLevelStatus(),
  gameDifficult: getHardLevelStatus() ? GameDifficult.HARD : GameDifficult.NORMAL,
  gameStatus: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GAME_DATA_GENERATE:
      return {...state, gameData: action.payload, isGameDataGenerate: true};
    case ActionType.GAME_DIFFICULT_CHANGE:
      return {...state, gameDifficult: action.payload, isGameDataGenerate: false, gameStatus: true};
    case ActionType.GAME_DATA_GENERATE_STATUS_RESET:
      return {...state, isGameDataGenerate: false};
    case ActionType.GAME_HARD_LEVEL_SET:
      return {...state, isHardLevel: action.payload};
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
