import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  const nextTurn = () => {
    activePlayer == 'X' ? setActivePlayer('O') : setActivePlayer('X');
  };

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
              <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
          </ol>
        <GameBoard nextTurn={nextTurn} activePlayerSymbol={activePlayer}/>
        </div>
      </main>
    </>
  );
};

export default App
