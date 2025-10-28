import React, { useState, useEffect } from 'react';


const CARD_EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function initializeGame() {
  const duplicatedEmojis = [...CARD_EMOJIS, ...CARD_EMOJIS];
  const shuffledEmojis = shuffleArray(duplicatedEmojis);
  return shuffledEmojis.map((emoji, index) => ({
    id: index,
    emoji: emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

function App() {

  const [cards, setCards] = useState(initializeGame);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    if (flippedIndices.length < 2) return;

    const [index1, index2] = flippedIndices;
    const card1 = cards[index1];
    const card2 = cards[index2];

    if (card1.emoji === card2.emoji) {
      // It's a match!
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.emoji === card1.emoji ? { ...card, isMatched: true } : card
        )
      );
      setFlippedIndices([]);
    } else {

      const timeoutId = setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === index1 || index === index2
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedIndices([]);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [flippedIndices, cards]);


  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && cards.length > 0) {
      setGameOver(true);
    }
  }, [cards]);

  const handleCardClick = (index) => {

    if (
      flippedIndices.length >= 2 || // Max 2 cards flipped
      cards[index].isFlipped || // Card is already flipped
      cards[index].isMatched // Card is already matched
    ) {
      return;
    }

    // Flip the card
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    // Update game state
    setFlippedIndices((prevIndices) => [...prevIndices, index]);
    setMoves((prevMoves) => prevMoves + 1);
  };

  const handleRestart = () => {
    setCards(initializeGame());
    setFlippedIndices([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>MemoRift</h1>
      <div className="stats">Moves: {moves}</div>

      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${
              card.isFlipped || card.isMatched ? 'is-flipped' : ''
            } ${card.isMatched ? 'is-matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-face card-front">Open</div>
              <div className="card-face card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="game-over-modal">
          <div className="game-over-content">
            <h2>Congratulations!</h2>
            <p>You completed the game in {moves} moves.</p>
            <button className="restart-button" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Show restart button even if game isn't over */}
      {!gameOver && (
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      )}
    </div>
  );
}

export default App;