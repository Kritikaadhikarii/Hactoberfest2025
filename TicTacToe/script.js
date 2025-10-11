// Tic-Tac-Toe Game JavaScript
class TicTacToeGame {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameMode = 'single'; // 'single' or 'multi'
        this.difficulty = 'easy'; // 'easy', 'medium', 'hard'
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0,
            draw: 0
        };
        this.gameHistory = JSON.parse(localStorage.getItem('ticTacToeHistory') || '[]');
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.loadScores();
    }

    initializeElements() {
        this.elements = {
            gameBoard: document.getElementById('gameBoard'),
            cells: document.querySelectorAll('.cell'),
            currentPlayerText: document.getElementById('currentPlayerText'),
            playerXScore: document.getElementById('playerXScore'),
            playerOScore: document.getElementById('playerOScore'),
            drawScore: document.getElementById('drawScore'),
            statusText: document.getElementById('statusText'),
            gameHistory: document.getElementById('gameHistory'),
            singlePlayerBtn: document.getElementById('singlePlayer'),
            multiPlayerBtn: document.getElementById('multiPlayer'),
            difficultySection: document.getElementById('difficultySection'),
            newGameBtn: document.getElementById('newGameBtn'),
            resetScoreBtn: document.getElementById('resetScoreBtn')
        };
    }

    bindEvents() {
        // Cell clicks
        this.elements.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        // Game mode buttons
        this.elements.singlePlayerBtn.addEventListener('click', () => this.setGameMode('single'));
        this.elements.multiPlayerBtn.addEventListener('click', () => this.setGameMode('multi'));

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setDifficulty(e.target.dataset.difficulty));
        });

        // Action buttons
        this.elements.newGameBtn.addEventListener('click', () => this.newGame());
        this.elements.resetScoreBtn.addEventListener('click', () => this.resetScores());
    }

    setGameMode(mode) {
        this.gameMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(mode === 'single' ? 'singlePlayer' : 'multiPlayer').classList.add('active');
        
        // Show/hide difficulty section
        this.elements.difficultySection.style.display = mode === 'single' ? 'block' : 'none';
        
        this.updateDisplay();
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== '') return;

        this.makeMove(index, this.currentPlayer);
        
        if (this.gameMode === 'single' && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeComputerMove(), 500);
        }
    }

    makeMove(index, player) {
        this.board[index] = player;
        this.elements.cells[index].textContent = player;
        this.elements.cells[index].classList.add(player.toLowerCase());
        
        // Add animation
        this.elements.cells[index].classList.add('fade-in');

        if (this.checkWinner()) {
            this.endGame(player);
        } else if (this.board.every(cell => cell !== '')) {
            this.endGame('draw');
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }

    makeComputerMove() {
        if (!this.gameActive) return;

        let move;
        
        switch (this.difficulty) {
            case 'easy':
                move = this.getRandomMove();
                break;
            case 'medium':
                move = Math.random() < 0.7 ? this.getBestMove() : this.getRandomMove();
                break;
            case 'hard':
                move = this.getBestMove();
                break;
        }

        this.makeMove(move, 'O');
    }

    getRandomMove() {
        const availableMoves = this.board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    getBestMove() {
        // Minimax algorithm for optimal play
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                const score = this.minimax(this.board, 0, false);
                this.board[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        const winner = this.checkWinner();
        
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (board.every(cell => cell !== '')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    const score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    const score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                // Highlight winning cells
                combination.forEach(index => {
                    this.elements.cells[index].classList.add('winning');
                });
                return this.board[a];
            }
        }
        return null;
    }

    endGame(result) {
        this.gameActive = false;
        
        // Disable all cells
        this.elements.cells.forEach(cell => cell.classList.add('disabled'));

        let message;
        if (result === 'draw') {
            message = "It's a draw! 🤝";
            this.scores.draw++;
        } else {
            message = `Player ${result} wins! 🎉`;
            this.scores[result]++;
        }

        this.elements.statusText.textContent = message;
        this.elements.statusText.classList.add('bounce');
        
        // Add to history
        this.addToHistory(result);
        
        // Update scores
        this.updateScores();
        
        // Show game over modal
        setTimeout(() => this.showGameOverModal(result), 1000);
    }

    showGameOverModal(result) {
        const overlay = document.createElement('div');
        overlay.className = 'game-over-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'game-over-modal';
        
        let title, message;
        if (result === 'draw') {
            title = "It's a Draw!";
            message = "Great game! Both players played well.";
        } else {
            title = `Player ${result} Wins!`;
            message = result === 'X' ? "Congratulations! You won!" : 
                     this.gameMode === 'single' ? "The computer won this time. Try again!" : 
                     "Player O wins! Well played!";
        }
        
        modal.innerHTML = `
            <h2>${title}</h2>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="game.newGame(); this.closest('.game-over-overlay').remove();">Play Again</button>
            <button class="btn btn-secondary" onclick="this.closest('.game-over-overlay').remove();">Close</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    newGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Clear board
        this.elements.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        // Remove game over overlay if exists
        const overlay = document.querySelector('.game-over-overlay');
        if (overlay) overlay.remove();
        
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.gameMode === 'single') {
            this.elements.currentPlayerText.textContent = 
                this.currentPlayer === 'X' ? "Your Turn (X)" : "Computer's Turn (O)";
        } else {
            this.elements.currentPlayerText.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
        
        if (!this.gameActive) {
            this.elements.currentPlayerText.textContent = "Game Over";
        }
    }

    updateScores() {
        this.elements.playerXScore.textContent = this.scores.X;
        this.elements.playerOScore.textContent = this.scores.O;
        this.elements.drawScore.textContent = this.scores.draw;
        
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }

    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScores();
        }
    }

    resetScores() {
        if (confirm('Are you sure you want to reset all scores?')) {
            this.scores = { X: 0, O: 0, draw: 0 };
            this.updateScores();
        }
    }

    addToHistory(result) {
        const gameRecord = {
            result: result,
            timestamp: new Date().toLocaleString(),
            mode: this.gameMode,
            difficulty: this.difficulty,
            board: [...this.board]
        };
        
        this.gameHistory.unshift(gameRecord);
        if (this.gameHistory.length > 50) {
            this.gameHistory = this.gameHistory.slice(0, 50);
        }
        
        localStorage.setItem('ticTacToeHistory', JSON.stringify(this.gameHistory));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyContainer = this.elements.gameHistory;
        
        if (this.gameHistory.length === 0) {
            historyContainer.innerHTML = '<p class="no-history">No games played yet</p>';
        } else {
            historyContainer.innerHTML = this.gameHistory.slice(0, 10).map(game => `
                <div class="history-item">
                    <div>
                        <span class="game-result">${game.result === 'draw' ? 'Draw' : `Player ${game.result} Wins`}</span>
                        <div class="game-details">${game.mode === 'single' ? 'vs Computer' : 'vs Player'} • ${game.difficulty} • ${game.timestamp}</div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new TicTacToeGame();
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (!game || !game.gameActive) return;
    
    const keyMap = {
        '1': 0, '2': 1, '3': 2,
        '4': 3, '5': 4, '6': 5,
        '7': 6, '8': 7, '9': 8
    };
    
    if (keyMap[e.key] !== undefined) {
        game.handleCellClick(keyMap[e.key]);
    }
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TicTacToeGame;
}
