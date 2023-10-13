export const BLOCK_SIZE = 20;
export const BOARD_WIDTH = 14;
export const BOARD_HEIGHT = 30;
export const SECOND = 1000;

export const ACTION_KEYS = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  ROTATE: "ArrowUp",
};

export const SCORES = {
  1: 10,
  2: 25,
  3: 40,
  4: 50,
};

const square = [
  [1, 1],
  [1, 1],
];
const el = [
  [0, 0, 4],
  [4, 4, 4],
];
const invertedEl = [
  [7, 7, 7],
  [0, 0, 7],
];
const zi = [
  [5, 5, 0],
  [0, 5, 5],
];
const invertedZi = [
  [0, 2, 2],
  [2, 2, 0],
];
const line = [[7, 7, 7, 7]];

const triangle = [
  [0, 3, 0],
  [3, 3, 3],
];

export const PIECES = [square, el, invertedEl, zi, invertedZi, line, triangle];
