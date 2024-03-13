const GameBoard = ({gameBoard, nextTurn}) => {
    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((symbol, colIndex) => <li key={colIndex}><button onClick={() => nextTurn(rowIndex, colIndex)} disabled={typeof symbol === 'string'}>{symbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
};

export default GameBoard;