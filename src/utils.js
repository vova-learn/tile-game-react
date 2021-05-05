import {GameDifficult, GameProcess, LifeIconName} from './const';

export const getHardLevelStatus = () => {
  const isHardLevel = localStorage.getItem(GameProcess.HARD_NAME_IN_STORAGE) === GameProcess.HARD_IS_TRUE_MASK ? true : false;
  return isHardLevel;
};

const getIconColor = (element) => {
  const pathFill = element.querySelector(`path`).getAttribute(`fill`);

  if (!pathFill) {
    const gFill = element.querySelector(`g`).getAttribute(`fill`);
    return `${gFill}`;
  }

  return `${pathFill}`;
};

const generateIcon = (element, index) => {
  const icon = {};
  icon.id = index;
  icon.name = element.id;
  icon.color = getIconColor(element);

  return icon;
};

const getIconsNames = (stage) => {
  /**
     * Решение не нравится, но для
     * автоматизации получения иконок
     * способа лучше не придумал
     */

  const iconsElements = document.querySelectorAll(`svg symbol`); // vissualy hidden
  const icons = [];

  if (stage === GameDifficult.NORMAL) {
    const MAX_COUNT_RAGE = 4;
    const startIndex = Math.ceil(Math.random() * MAX_COUNT_RAGE);
    const rangeCount = stage / GameProcess.TILES_COUPLE + startIndex;

    for (let i = startIndex; i < rangeCount; i++) {
      icons.push(generateIcon(iconsElements[i], i));
    }


  } else if (stage === GameDifficult.HARD) {
    const rangeCount = stage / GameProcess.TILES_COUPLE;
    for (let i = 0; i < rangeCount; i++) {
      icons.push(generateIcon(iconsElements[i], i));
    }
  }

  return icons;
};

export const generateGameData = (stage) => {
  const data = new Array(stage).fill(0).map((item, index) => index);
  const icons = getIconsNames(stage);
  const obj = {};

  const getRandomIndex = () => {
    const index = Math.floor(Math.random() * icons.length);

    if (obj[index] === 2) {
      return getRandomIndex();
    }

    if (obj[index] === 1) {
      obj[index] += 1;
    } else if (obj[index] === undefined) {
      obj[index] = 1;
    }

    return index;
  };

  return data.reduce((acc) => {
    const index = getRandomIndex();
    acc.push(icons[index]);
    return acc;
  }, []);
};

/**
 *
 * getSvgCollection логика для 3-х жизней
 *
 */

export const getSvgCollection = (count) => {
  const svgCollection = [];

  if (count === GameProcess.LIFE_COUNT) {
    for (let i = 0; i < GameProcess.LIFE_COUNT; i++) {
      svgCollection.push(LifeIconName.LIFE);
    }
  } else if (count === GameProcess.LIFE_COUNT - 1) {
    for (let i = 0; i < GameProcess.LIFE_COUNT; i++) {
      if (i === 0) {
        svgCollection.push(LifeIconName.NO_LIFE);
      } else {
        svgCollection.unshift(LifeIconName.LIFE);
      }
    }
  } else if (count === GameProcess.LIFE_COUNT - 2) {
    for (let i = 0; i < GameProcess.LIFE_COUNT; i++) {
      if (i <= 1) {
        svgCollection.push(LifeIconName.NO_LIFE);
      } else {
        svgCollection.unshift(LifeIconName.LIFE);
      }
    }
  } else if (count === GameProcess.LIFE_COUNT - 3) {
    for (let i = 0; i < GameProcess.LIFE_COUNT; i++) {
      if (i <= 2) {
        svgCollection.push(LifeIconName.NO_LIFE);
      }
    }
  }
  return svgCollection;
};
