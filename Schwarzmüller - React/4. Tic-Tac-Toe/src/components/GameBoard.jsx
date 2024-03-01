import { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    const handleClick = (row, col) => {
        setGameBoard(previous => {
            const newGameBoard = [...previous.map(innerArray => [...innerArray])];
            newGameBoard[row][col] = activePlayerSymbol;
            return newGameBoard;
        });

        onSelectSquare();
    };

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((symbol, colIndex) => <li key={colIndex}><button onClick={() => handleClick(rowIndex, colIndex)}>{symbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
};