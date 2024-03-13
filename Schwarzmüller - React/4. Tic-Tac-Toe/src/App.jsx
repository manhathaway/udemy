import { useState } from 'react';
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// Deep copies the initial game board, and labels the squares with the respective symbols.
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
  
  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  };
  return gameBoard;
};

// Sets the active player.
const deriveActivePlayer = (gameTurns) => {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
};

// Checks for a winner.
const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  };
  return winner;
};

const App = () => {
  // Logs each move made by the players.
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  // Lifts the name states up from 'Players' and stores them into the above stateful object.
  const saveName = (name, symbol) => {
    setPlayers(previous => {
      return {
        ...previous,
        [symbol]: name
      };
    });
  };

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  
  // If a winner is declared by the function, assigns it to 'winner'.
  const winner = deriveWinner(gameBoard, players);
  // Boolean that checks for a draw.
  const draw = !winner && gameTurns.length === 9;

  // Runs when player clicks a square - changes turns and logs move to gameTurns state.
  const nextTurn = (row, col) => {
    setGameTurns(previous => {
      const currentPlayer = deriveActivePlayer(previous);
      return [{square: {row: row, col: col}, player: currentPlayer}, ...previous]
    })
  };

  // Runs when player clicks 'reset' button on GameOver screen.
  const resetGame = () => {
    setGameTurns([]);
  };

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName={PLAYERS.X} saveName={saveName} symbol="X" isActive={activePlayer === 'X'}/>
              <Player initialName={PLAYERS.O} saveName={saveName} symbol="O" isActive={activePlayer === 'O'}/>
          </ol>
          {(winner || draw) && <GameOver winner={winner} resetGame={resetGame}/>}
          <GameBoard nextTurn={nextTurn} gameBoard={gameBoard}/>
        </div>
        <Log gameTurns={gameTurns}/>
      </main>
    </>
  );
};

export default App
