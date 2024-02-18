import React from 'react';

const Note = (props) => {
    return (
        <div className="note">
            <div>
                <h1>{props.title}</h1>
                <button type="submit" onClick={() => props.function(props.id)}>x</button>
            </div>
            <p>{props.content}</p>
        </div>
    );
};

export default Note;