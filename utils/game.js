import {
  ACTION_KEYS,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PIECES,
  SCORES,
} from "./constants";
import { board } from "../main";

export const createBoard = () => {
  const board = Array(BOARD_HEIGHT);
  for (let index = 0; index < board.length; index++) {
    board[index] = new Array(BOARD_WIDTH).fill(0);
  }
  return board;
};

export function getColor(number) {
  switch (number) {
    case 1:
      return "yellow";
    case 2:
      return "green";
    case 3:
      return "purple";
    case 4:
      return "blue";
    case 5:
      return "red";
    case 6:
      return "pink";
    case 7:
      return "orange";
    default:
      return "orange";
  }
}

function checkCollision(board, piece) {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

function solidifyPiece(piece) {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        board[y + piece.position.y][x + piece.position.x] = value;
      }
    });
  });

  piece.shape = getRandomPiece();
  resetPiecePosition(piece);

  if (checkCollision(board, piece)) {
    window.alert("Morimos");
    board.forEach((row) => row.fill(0));
  }
}

function resetPiecePosition(piece) {
  piece.position.x = Math.floor(BOARD_WIDTH / 2);
  piece.position.y = 0;
}

function getRandomPiece() {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

function removeRows(score) {
  const rowsToRemove = [];

  //Find row with full values

  board.forEach((row, y) => {
    if (row.every((value) => value !== 0)) rowsToRemove.push(y);
  });

  const numberOfRowsToRemove = rowsToRemove.length;
  updateScore(score, getScore(numberOfRowsToRemove));

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = new Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
  });
}

function getScore(rowsRemoved) {
  if (SCORES[rowsRemoved]) return SCORES[rowsRemoved];
  return 1;
}

function updateScore(score, newScore) {
  if (
    typeof newScore === "number" &&
    typeof score === "number" &&
    newScore > 0
  ) {
    score += newScore;
    document.querySelector("#score__span").innerText = score;
  }
}

//Player piece movement
export function movePiece(key, piece, score = undefined) {
  switch (key) {
    case ACTION_KEYS.LEFT:
      moveLeft(piece);
      if (checkCollision(board, piece)) {
        moveRight(piece);
      }
      break;
    case ACTION_KEYS.RIGHT:
      moveRight(piece);
      if (checkCollision(board, piece)) {
        moveLeft(piece);
      }
      break;
    case ACTION_KEYS.DOWN:
      moveDown(piece);
      if (checkCollision(board, piece)) {
        piece.position.y--;
        solidifyPiece(piece);
        removeRows(score);
      }
      break;
    default:
      break;
  }
}

export function moveLeft(piece) {
  piece.position.x--;
}

export function moveRight(piece) {
  piece.position.x++;
}

export function moveDown(piece) {
  piece.position.y++;
}
