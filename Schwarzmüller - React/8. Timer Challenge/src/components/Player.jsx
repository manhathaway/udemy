import { useState, useRef } from 'react'; 

export default function Player() {
  const input = useRef();
  const [playerName, setPlayerName] = useState('');

  const handleClick = () => {
    setPlayerName(input.current.value);
    input.current.value = '';
  };

  return (
    <section id="player">
      <h2>Hello, {playerName ?? 'enter a name!'}</h2>
      <p>
        <input ref={input} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
