(() => {
  const categories = {
    Animals: [
      'ELEPHANT','DOLPHIN','KANGAROO','GIRAFFE','CROCODILE','BUTTERFLY','FLAMINGO','OCTOPUS','PENGUIN','SQUIRREL',
      'HIPPOPOTAMUS','RACCOON','CHAMELEON','HEDGEHOG','WOODPECKER'
    ],
    Countries: [
      'ARGENTINA','BRAZIL','CAMBODIA','DENMARK','ETHIOPIA','FINLAND','GUATEMALA','HUNGARY','INDONESIA','JAPAN',
      'KAZAKHSTAN','LUXEMBOURG','MADAGASCAR','NETHERLANDS','PHILIPPINES','PORTUGAL','ROMANIA','SINGAPORE','TANZANIA','VENEZUELA'
    ],
    Tech: [
      'ALGORITHM','DATABASE','FRAMEWORK','JAVASCRIPT','PYTHON','COMPILER','ENCRYPTION','KUBERNETES','MICROSERVICES','RECURSION',
      'ASYNC','REACT','WEBPACK','TYPESCRIPT','MIDDLEWARE','ENDPOINT'
    ]
  };

  const maxMistakes = 6; // head, body, 2 arms, 2 legs

  // Elements
  const wordEl = document.getElementById('word');
  const keyboardEl = document.getElementById('keyboard');
  const messageEl = document.getElementById('message');
  const categoryEl = document.getElementById('category');
  const newGameBtn = document.getElementById('newGameBtn');
  const hintBtn = document.getElementById('hintBtn');
  const winsEl = document.getElementById('wins');
  const lossesEl = document.getElementById('losses');

  const parts = Array.from(document.querySelectorAll('.gallows .part'));

  const storage = {
    getWins() { return parseInt(localStorage.getItem('hangman_wins') || '0', 10); },
    getLosses() { return parseInt(localStorage.getItem('hangman_losses') || '0', 10); },
    setWins(n) { localStorage.setItem('hangman_wins', String(n)); },
    setLosses(n) { localStorage.setItem('hangman_losses', String(n)); },
  };

  let gameState = {
    categoryName: '',
    answer: '',
    guessed: new Set(),
    revealed: new Set(),
    mistakes: 0,
    isOver: false,
    hintUsed: false,
  };

  function updateStatsUI() {
    winsEl.textContent = String(storage.getWins());
    lossesEl.textContent = String(storage.getLosses());
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function startNewGame() {
    const categoryNames = Object.keys(categories);
    const categoryName = pickRandom(categoryNames);
    const answer = pickRandom(categories[categoryName]);

    gameState = {
      categoryName,
      answer,
      guessed: new Set(),
      revealed: new Set(),
      mistakes: 0,
      isOver: false,
      hintUsed: false,
    };

    categoryEl.textContent = `Category: ${categoryName}`;
    messageEl.textContent = '';
    messageEl.classList.remove('win', 'lose');
    renderWord();
    renderKeyboard();
    renderParts();
    hintBtn.disabled = false;
  }

  function renderWord() {
    const letters = gameState.answer.split('').map(ch => {
      if (ch === ' ') return ' ';
      const show = gameState.revealed.has(ch) || gameState.guessed.has(ch);
      return show ? ch : '_';
    });
    wordEl.textContent = letters.join(' ');
  }

  function renderKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keyboardEl.innerHTML = '';
    for (const ch of alphabet) {
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = ch;
      btn.disabled = gameState.isOver || gameState.guessed.has(ch);
      if (gameState.guessed.has(ch)) btn.classList.add('used');
      btn.addEventListener('click', () => handleGuess(ch));
      keyboardEl.appendChild(btn);
    }
  }

  function renderParts() {
    parts.forEach((el, idx) => {
      if (idx < gameState.mistakes) {
        el.classList.remove('hidden');
        el.classList.add('revealed');
      } else {
        el.classList.add('hidden');
        el.classList.remove('revealed');
      }
    });
  }

  function handleGuess(letter) {
    if (gameState.isOver) return;
    const upper = letter.toUpperCase();
    if (gameState.guessed.has(upper)) return;
    gameState.guessed.add(upper);

    if (gameState.answer.includes(upper)) {
      // correct guess
      updateKeyboardClasses(upper, true);
      checkWin();
    } else {
      // wrong guess
      updateKeyboardClasses(upper, false);
      gameState.mistakes += 1;
      renderParts();
      if (gameState.mistakes >= maxMistakes) endGame(false);
    }
    renderWord();
  }

  function updateKeyboardClasses(letter, correct) {
    const btns = Array.from(keyboardEl.querySelectorAll('.key'));
    const btn = btns.find(b => b.textContent === letter);
    if (btn) {
      btn.classList.add('used');
      btn.classList.add(correct ? 'correct' : 'wrong');
      btn.disabled = true;
    }
  }

  function revealOneLetter() {
    // find a letter in the answer that is not guessed/revealed
    const candidates = [...new Set(gameState.answer.replace(/[^A-Z]/g, '').split(''))]
      .filter(ch => !gameState.guessed.has(ch) && !gameState.revealed.has(ch));
    if (candidates.length === 0) return;
    const pick = pickRandom(candidates);
    gameState.revealed.add(pick);
    // mark keyboard key as used-correct
    updateKeyboardClasses(pick, true);
    renderWord();
    checkWin();
  }

  function checkWin() {
    const allLetters = new Set(gameState.answer.replace(/[^A-Z]/g, '').split(''));
    const solved = [...allLetters].every(ch => gameState.guessed.has(ch) || gameState.revealed.has(ch));
    if (solved) endGame(true);
  }

  function endGame(won) {
    gameState.isOver = true;
    if (won) {
      messageEl.textContent = 'You win!';
      messageEl.classList.remove('lose');
      messageEl.classList.add('win');
      storage.setWins(storage.getWins() + 1);
    } else {
      messageEl.textContent = `You lose. The word was: ${gameState.answer}`;
      messageEl.classList.remove('win');
      messageEl.classList.add('lose');
      storage.setLosses(storage.getLosses() + 1);
      // reveal remaining parts
      gameState.mistakes = maxMistakes;
      renderParts();
    }
    updateStatsUI();
    // disable all keys
    Array.from(keyboardEl.querySelectorAll('.key')).forEach(b => (b.disabled = true));
    hintBtn.disabled = true;
  }

  // Events
  newGameBtn.addEventListener('click', startNewGame);
  hintBtn.addEventListener('click', () => {
    if (gameState.isOver || gameState.hintUsed) return;
    gameState.hintUsed = true;
    hintBtn.disabled = true;
    revealOneLetter();
  });

  window.addEventListener('keydown', (e) => {
    if (gameState.isOver) return;
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      handleGuess(key);
    } else if (key === 'ENTER') {
      startNewGame();
    }
  });

  // boot
  updateStatsUI();
  startNewGame();
})();


