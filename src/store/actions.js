import {generateGameData} from "../utils";

export const ActionType = {
  GAME_DATA_GENERATE: `DATA/GAME_DATA_GENERATE`,
  GAME_DATA_GENERATE_STATUS_RESET: `DATA/GAME_DATA_GENERATE_STATUS_RESET`,
  GAME_DIFFICULT_CHANGE: `GAMEPROCESS/GAME_DIFFICULT_CHANGE`,
  GAME_HARD_LEVEL_SET: `GAMEPROCESS/GAME_HARD_LEVEL_SET`,
};

export const ActionCreator = {
  generateGameData: (gameDifficult) => ({
    type: ActionType.GAME_DATA_GENERATE,
    payload: generateGameData(gameDifficult),
  }),
  changeGameDifficult: (gameDifficult) => ({
    type: ActionType.GAME_DIFFICULT_CHANGE,
    payload: gameDifficult,
  }),
  resetGameDataGenerateStatus: () => ({
    type: ActionType.GAME_DATA_GENERATE_STATUS_RESET,
  }),
  setHardLevel: (isHardLevel = true) => ({
    type: ActionType.GAME_HARD_LEVEL_SET,
    payload: isHardLevel
  }),
};
