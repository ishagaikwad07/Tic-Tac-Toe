const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerXButton = document.getElementById('playerX');
const playerOButton = document.getElementById('playerO');
const toggleThemeButton = document.getElementById('toggleTheme');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isDarkTheme = false;

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'cell-x' : 'cell-o');
    cell.classList.add('fade-in');

    checkResult();
}

// Function to check for a win or tie
function checkResult() {
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

    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        highlightWinningCells(condition);
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'It\'s a tie!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;

    // AI turn after player
    if (isGameActive && currentPlayer === 'O') {
        aiTurn();
    }
}

// Function to highlight winning cells
function highlightWinningCells(condition) {
    condition.forEach(index => {
        const cell = document.querySelector(`.cell[data-cell-index="${index}"]`);
        cell.classList.add('winning');
    });
}

// Function for AI to make a random move
function aiTurn() {
    const availableCells = board.map((value, index) => value === '' ? index : null).filter(v => v !== null);
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    if (randomCell !== undefined) {
        board[randomCell] = 'O';
        const cell = document.querySelector(`.cell[data-cell-index="${randomCell}"]`);
        cell.textContent = 'O';
        cell.classList.add('cell-o', 'fade-in');
        checkResult();
    }
}

// Function to reset the game
function resetGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusElement.textContent = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('cell-x', 'cell-o', 'winning');
    });
}

// Function to toggle themes
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.className = isDarkTheme ? 'dark' : 'default';
}

// Event listeners
boardElement.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
toggleThemeButton.addEventListener('click', toggleTheme);
playerXButton.addEventListener('click', () => {
    currentPlayer = 'X';
    resetGame();
});
playerOButton.addEventListener('click', () => {
    currentPlayer = 'O';
    resetGame();
});
