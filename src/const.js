/**
 * Difficulty level of the game
 *
 * Normal lelev is 4x4
 * Hard lelev is 6x4
 */
export const GameDifficult = {
  NORMAL: 16,
  HARD: 24,
};

export const GameColor = {
  ALPHA_POWER: `50`,
  DEFAULT_COLORS: [`#ff5e95`, `#6aa9ff`, `#ffb64c`, `#ff5e95`],
  BOX_SHADOW: `0px 4px 10px 0px`,
};

const MILLISECONDS = 1000;

export const GameProcess = {
  LIFE_COUNT: 3,
  TILES_COUPLE: 2,
  HARD_NAME_IN_STORAGE: `_h`,
  HARD_IS_TRUE_MASK: `1620161700`,
  TIMEOUT: {
    NORMAL: 5 * MILLISECONDS,
    HARD: 10 * MILLISECONDS,
  },
};

export const AppRoute = {
  ROOT: `/`,
  GAME: `/game`,
};

export const ButtonName = {
  START: `Начать игру 🚀`,
  NORMAL: `4x4 ✨`,
  HARD: `6x4 🔥`,
  HARD_DISABLED: `6x4 ✋⛔`,
  REPLAY: `Переиграть 🥺`,
  REPLAY_WIN: `Переиграть 🗿`,
  LEVEL_WIN: `Продолжить 😏`,
  GAME_WIN: `Вернуться на главную 🐲`,
};

export const GameMessage = {
  GAME_OVER: `Слишком много ошибок`,
  LEVEL_WIN: `Открыта новая сложность`,
  GAME_WIN: `Поздравляем c победой 🎉`,
};

export const LifeIconName = {
  NO_LIFE: `life-nofill`,
  LIFE: `life-fill`,
};
