const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
let currentPlayer = 'X', gameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

function checkWinner(player) {
    for (const [a, b, c] of winPatterns) {
        if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent === player) {
            return player;
        }
    }
    return [...cells].every(cell => cell.textContent) ? 'Tie' : null;
}

function aiMove() {
    for (const [a, b, c] of winPatterns) {
        if (cells[a].textContent === cells[b].textContent && cells[a].textContent === 'O' && !cells[c].textContent) { cells[c].textContent = 'O'; return; }
        if (cells[a].textContent === cells[c].textContent && cells[a].textContent === 'O' && !cells[b].textContent) { cells[b].textContent = 'O'; return; }
        if (cells[b].textContent === cells[c].textContent && cells[b].textContent === 'O' && !cells[a].textContent) { cells[a].textContent = 'O'; return; }
        if (cells[a].textContent === cells[b].textContent && cells[a].textContent === 'X' && !cells[c].textContent) { cells[c].textContent = 'O'; return; }
        if (cells[a].textContent === cells[c].textContent && cells[a].textContent === 'X' && !cells[b].textContent) { cells[b].textContent = 'O'; return; }
        if (cells[b].textContent === cells[c].textContent && cells[b].textContent === 'X' && !cells[a].textContent) { cells[a].textContent = 'O'; return; }
    }
    if (!cells[4].textContent) { cells[4].textContent = 'O'; return; }
    const available = [0, 2, 6, 8].filter(i => !cells[i].textContent);
    if (available.length) { cells[available[Math.floor(Math.random() * available.length)]].textContent = 'O'; return; }
    cells[[1, 3, 5, 7].filter(i => !cells[i].textContent)[Math.floor(Math.random() * 4)]].textContent = 'O';
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent || currentPlayer === 'O' || gameOver) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer); // Add class for X or O
    const winner = checkWinner(currentPlayer);
    if (winner) { statusDiv.textContent = winner === 'Tie' ? "It's a tie!" : `${winner} wins!`; gameOver = true; return; }

    currentPlayer = 'O';
    statusDiv.textContent = "AI's turn...";
    setTimeout(() => {
        aiMove();
        const aiWinner = checkWinner('O');
        if (aiWinner) { statusDiv.textContent = aiWinner === 'Tie' ? "It's a tie!" : `${aiWinner} wins!`; gameOver = true; return; }
        currentPlayer = 'X';
        statusDiv.textContent = "Player X's turn";
    }, 500);
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
