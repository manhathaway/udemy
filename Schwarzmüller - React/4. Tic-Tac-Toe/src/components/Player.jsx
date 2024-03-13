import { useState } from "react";

const Player = ({initialName, symbol, isActive, saveName}) => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(initialName)
    
    const handleChange = (event) => {
        const {value} = event.target;
        setName(value);
    };

    const handleClick = () => {
        saveName(name, symbol);
        name.length > 0 && setEdit(previous => !previous)
    };
    
    let playerName;
    // Conditional rendering depending on whether the 'edit' button is clicked.
    !edit ?
        playerName = <span className="player-name">{name}</span>
        :
        playerName = <input type="text" value={name} onChange={handleChange} style={name.length === 0 ? {outline: '1px solid red'} : undefined}/>;
    
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
        <button onClick={handleClick} disabled={name.length === 0}>{edit ? 'Save' : 'Edit'}</button>
        </li>
    );
};

export default Player;