import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from './components/Log';

const App = () => {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  const nextTurn = (row, col) => {
    activePlayer == 'X' ? setActivePlayer('O') : setActivePlayer('X');
    setGameTurns(previous => {
      let currentPlayer = 'X';
      previous.length > 0 && previous[0].player === 'X' ? currentPlayer = '0' : currentPlayer = 'X';
      return [{square: {row: row, col: col}, player: currentPlayer}, ...previous]
    })
  };

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
              <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
          </ol>
        <GameBoard nextTurn={nextTurn} gameTurns={gameTurns}/>
        </div>
        <Log gameTurns={gameTurns}/>
      </main>
    </>
  );
};

export default App
