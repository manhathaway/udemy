import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const Note = (props) => {
    return (
        <div className="note">
            <div>
                <h1>{props.title}</h1>
                <button type="submit" onClick={() => props.function(props.id)}>
                    <DeleteIcon/>
                </button>
            </div>
            <p>{props.content}</p>
        </div>
    );
};

export default Note;