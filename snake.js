const gameBoard = document.getElementById("game-board");
const gridSize = 20;

let food = null;
let gammeInterval = null;
let direction = { x: 0, y: 0 };
const snake = [{ x: 10, y: 10 }];

const complexity = {
  20: 800,
  40: 600,
  60: 400,
};

function createGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    // for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
  }
}

createGrid();

function generateFood() {
  let newFood;
  newFood = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };
  return newFood;
}
function draw() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("snake-body", "food"));
  snake.forEach((segment) => {
    const index = segment.y * gridSize + segment.x;
    cells[index].classList.add("snake-body");
  });

  if (food) {
    const foodIndex = food.y * gridSize + food.x;
    cells[foodIndex].classList.add("food");
  }
}

function move() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (food && food.x === head.x && food.y === head.y) {
    food = generateFood();
  } else {
    snake.pop();
  }

  draw();
  console.log("SNAKE: ", snake);
}

function gameOver() {
  clearInterval(gammeInterval);
  alert("Game over");
}

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }

  console.log("DIRECTION: ", direction);
});

function startGame() {
  food = generateFood();
  gammeInterval = setInterval(move, 500);
  draw();
}

startGame();