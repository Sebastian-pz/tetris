import "./style.css";
import {
  BLOCK_SIZE,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  SECOND,
} from "./utils/constants";
import { createBoard, getColor, movePiece } from "./utils/game";

const canvas = document.querySelector("canvas");

const canvasContext = canvas.getContext("2d");

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);

export const board = createBoard();

const playerPiece = {
  position: {
    x: Math.floor(BOARD_WIDTH / 2),
    y: 0,
  },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

//Game loop
let dropCounter = 0;
let lastTime = 0;
function update(time = 0) {
  //Natural drop ---------
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > SECOND) {
    movePiece("ArrowDown", playerPiece);
    dropCounter = 0;
  }
  // --------------------
  draw();
  window.requestAnimationFrame(update);
}

//draw frames
function draw() {
  canvasContext.fillStyle = "#2b2b2b";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        canvasContext.fillStyle = getColor(value);
        canvasContext.fillRect(x, y, 1, 1);
      }
    });
  });

  playerPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        canvasContext.fillStyle = getColor(value);
        canvasContext.fillRect(
          x + playerPiece.position.x,
          y + playerPiece.position.y,
          1,
          1
        );
      }
    });
  });
}

document.addEventListener("keydown", (event) => {
  movePiece(event.key, playerPiece);
});

update();
