import { ACTION_KEYS, BOARD_HEIGHT, BOARD_WIDTH, PIECES } from "./constants";
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

function removeRows() {
  const rowsToRemove = [];

  //Find row with full values
  board.forEach((row, y) => {
    if (row.every((value) => value !== 0)) rowsToRemove.push(y);
  });
  const newScore = getScore(rowsToRemove.length);

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = new Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
  });

  return newScore;
}

function getScore(rowsRemoved) {
  return 15 * rowsRemoved;
}

//Player piece movement
export function movePiece(key, piece) {
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
        removeRows();
      }
      break;
    case ACTION_KEYS.ROTATE: {
      const rotated = [];

      for (let i = 0; i < piece.shape[0].length; i++) {
        const row = [];
        for (let j = piece.shape.length - 1; j >= 0; j--) {
          row.push(piece.shape[j][i]);
        }
        rotated.push(row);
      }

      const previousShape = piece.shape;

      piece.shape = rotated;
      if (checkCollision(board, piece)) {
        piece.shape = previousShape;
      }
      break;
    }
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
