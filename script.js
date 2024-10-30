// JavaScript Tic-Tac-Toe Game Logic with Player Choice and Basic AI
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerSelection = document.getElementById('playerSelection');
const chooseXButton = document.getElementById('chooseX');
const chooseOButton = document.getElementById('chooseO');
const board = document.getElementById('board');

let currentPlayer;
let playerSymbol;
let aiSymbol;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Win conditions: indexes of cells for each winning combination
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the game based on player choice
function initializeGame(symbol) {
  playerSymbol = symbol;
  aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
  currentPlayer = 'X'; // X always starts
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  statusDisplay.style.display = 'block';
  board.style.display = 'grid';
  resetButton.style.display = 'block';
  playerSelection.style.display = 'none';
}

// Handle player symbol selection
chooseXButton.addEventListener('click', () => initializeGame('X'));
chooseOButton.addEventListener('click', () => initializeGame('O'));

// Handle player turn
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (boardState[cellIndex] !== '' || !gameActive || currentPlayer !== playerSymbol) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  checkGameResult();
  if (gameActive) {
    currentPlayer = aiSymbol;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    setTimeout(handleAIMove, 500); // AI move after delay
  }
}

// Check for win or tie
function checkGameResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      [a, b, c].forEach(index => cells[index].classList.add('winning'));
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!boardState.includes('')) {
    statusDisplay.textContent = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle AI move
function handleAIMove() {
  if (!gameActive) return;

  const emptyCells = boardState
    .map((value, index) => (value === '' ? index : null))
    .filter(index => index !== null);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    checkGameResult();
    if (gameActive) {
      currentPlayer = playerSymbol;
      statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Reset the game
function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  boardState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
  playerSelection.style.display = 'block';
  board.style.display = 'none';
  resetButton.style.display = 'none';
  statusDisplay.style.display = 'none';
}

// Event listeners for each cell and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
