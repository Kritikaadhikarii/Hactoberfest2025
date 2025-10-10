document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const queensInput = document.getElementById('queens-input');
    const errorMessage = document.getElementById('error-message');
    const chessboardsContainer = document.getElementById('chessboards-container');

    generateBtn.addEventListener('click', generateChessboards);
    queensInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateChessboards();
        }
    });

    function generateChessboards() {
        const input = queensInput.value.trim();
        if (!input) {
            showError('Please enter a queens string.');
            return;
        }

        try {
            const solutions = JSON.parse(input);
            validateSolutions(solutions);

            hideError();
            chessboardsContainer.innerHTML = '';

            solutions.forEach((solution, idx) => {
                const boardElem = createChessboard(solution, idx + 1);
                chessboardsContainer.appendChild(boardElem);
            });

        } catch (err) {
            showError(`Error parsing input: ${err.message}`);
        }
    }

    function validateSolutions(solutions) {
        if (!Array.isArray(solutions)) throw new Error('Input must be an array of solutions.');
        if (solutions.length === 0) throw new Error('No solutions provided.');

        solutions.forEach((sol, i) => {
            if (!Array.isArray(sol)) throw new Error(`Solution ${i+1} must be an array of strings.`);
            const n = sol.length;
            if (n === 0) throw new Error(`Solution ${i+1} is empty.`);
            sol.forEach((row, j) => {
                if (typeof row !== 'string') throw new Error(`Solution ${i+1}, row ${j+1} must be a string.`);
                if (row.length !== n) throw new Error(
                    `Solution ${i+1}, row ${j+1} has incorrect length. Expected ${n}, got ${row.length}.`
                );
            });
        });
    }

    function createChessboard(solution, solutionNumber) {
        const n = solution.length;
        const wrapper = document.createElement('div');
        wrapper.className = 'chessboard-wrapper';

        const title = document.createElement('h3');
        title.className = 'chessboard-title';
        title.textContent = `Solution ${solutionNumber}`;
        wrapper.appendChild(title);

        const board = document.createElement('div');
        board.className = 'chessboard';
        board.style.display = 'grid';
        board.style.gridTemplateColumns = `repeat(${n}, 40px)`;
        board.style.gridTemplateRows = `repeat(${n}, 40px)`;
        board.style.gap = '0';

        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                const square = document.createElement('div');
                square.className = 'chessboard-square';
                const isLight = (row + col) % 2 === 0;
                square.classList.add(isLight ? 'light' : 'dark');
                square.style.width = '40px';
                square.style.height = '40px';

                if (solution[row][col] === 'Q') {
                    const queen = document.createElement('span');
                    queen.className = 'queen';
                    queen.textContent = '♛';
                    queen.style.fontSize = '24px';
                    queen.style.display = 'block';
                    queen.style.textAlign = 'center';
                    queen.style.lineHeight = '40px';
                    square.appendChild(queen);
                }
                board.appendChild(square);
            }
        }

        wrapper.appendChild(board);
        return wrapper;
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    }
    function hideError() {
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }

    queensInput.value = `[
        [
            ".Q..",
            "...Q",
            "Q...",
            "..Q."
        ],
        [
            "..Q.",
            "Q...",
            "...Q",
            ".Q.."
        ]
    ]`;
});
