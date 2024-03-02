const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const GameBoard = ({nextTurn, gameTurns}) => {
    let gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
/*  
    const handleClick = (row, col) => {
        setGameBoard(previousRows => {
            const updatedBoard = [...previousRows.map(previousCols => [...previousCols])];
            if (typeof updatedBoard[row][col] !== 'string') {
                updatedBoard[row][col] = activePlayer;
                nextTurn();
            };
            return updatedBoard;
        });
    };
*/

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((symbol, colIndex) => <li key={colIndex}><button onClick={() => nextTurn(rowIndex, colIndex)}>{symbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
};

export default GameBoard;