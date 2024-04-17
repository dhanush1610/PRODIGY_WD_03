const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer;
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

startGame();

function startGame() {
  currentPlayer = X_CLASS;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  statusDisplay.innerText = `${currentPlayer}'s turn`;
  resetButton.addEventListener('click', resetGame);
}

function handleClick(e) {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return;
  }

  placeMark(cell, cellIndex);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    statusDisplay.innerText = `${currentPlayer}'s turn`;
  }
}

function placeMark(cell, cellIndex) {
  cell.classList.add(currentPlayer);
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function setBoardHoverClass() {
  document.body.classList.remove(X_CLASS);
  document.body.classList.remove(O_CLASS);
  document.body.classList.add(currentPlayer);
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    statusDisplay.innerText = 'Draw!';
  } else {
    statusDisplay.innerText = `${currentPlayer} wins!`;
  }
  gameActive = false;
}

function resetGame() {
  gameActive = true;
  startGame();
}
