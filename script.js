let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const board = document.getElementById('board');
const status = document.getElementById('status');
const resultModal = document.getElementById('result-modal');
const resultText = document.getElementById('result-text');

// Create cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            showResult(`Player ${currentPlayer} wins!`);
        } else if (boardState.every(cell => cell !== '')) {
            showResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        
       
    });
}

function showResult(message) {
    resultText.textContent = message;
    resultModal.style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    status.textContent = `Player ${currentPlayer}'s turn`;
    resultModal.style.display = 'none';
}
