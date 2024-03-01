import { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({nextTurn, activePlayerSymbol}) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    
    const handleClick = (row, col) => {
        setGameBoard(previous => {
            const updatedBoard = [...previous.map(innerArray => [...innerArray])];
            if (typeof updatedBoard[row][col] !== 'string') {
                updatedBoard[row][col] = activePlayerSymbol;
                nextTurn();
            };
            return updatedBoard;
        });
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