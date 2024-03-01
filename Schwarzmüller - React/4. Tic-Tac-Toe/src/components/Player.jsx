import { useState } from "react";

export default function Player({initialName, symbol, isActive}) {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(initialName)
    
    const handleChange = (event) => {
        const {value} = event.target;
        setName(value);
    };

    const handleClick = () => {
        name.length > 0 &&
            setEdit(previous => !previous)
    };
    
    let playerName;
    !edit ?
        playerName = <span className="player-name">{name}</span>
        :
        playerName = <input type="text" value={name} onChange={handleChange} style={name.length === 0 ? {outline: '1px solid red'} : null}/>;
    
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
        <button onClick={handleClick} disabled={name.length == 0}>{edit ? 'Save' : 'Edit'}</button>
        </li>
    );
};