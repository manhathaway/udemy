import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/AddCircleRounded';

import { Fade } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

const Form = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setNote(previous => {
            return {
                ...previous,
                [name]: value
            };
        });
    };
    
    const handleClick = () => {
        if (note.title.length !== 0 && note.content.length !== 0) {
            props.function(note);
            
            setNote({
                title: "",
                content: ""
            });
        } else {
            if (note.title.length !== 0) {
                setNote(previous => ({
                    title: previous.title,
                    content: "Enter some content here."
                }));
                setTimeout(() => {
                    setNote(previous => ({
                        title: previous.title,
                        content: ""
                    }));
                }, 1500);
            } else if (note.content.length !== 0) {
                setNote(previous => ({
                    title: "Enter a title here.",
                    content: previous.content
                }));
                setTimeout(() => {
                    setNote(previous => ({
                        title: "",
                        content: previous.content
                    }));
                }, 1500);
            } else {
                setNote({
                    title: "Enter a title here.",
                    content: "Enter some content here."
                });
                setTimeout(() => {
                    setNote({
                        title: "",
                        content: ""
                    });
                }, 1500);
            };
        };
    };
    
    return (
        <div id="grid">
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? <KeyboardArrowLeftRoundedIcon/> : <KeyboardArrowRightRoundedIcon/>}
            </button>
            {showForm && 
                <div id="form">
                    <Fade in={showForm}>
                        <input name="title" value={note.title} type="text" placeholder='Title' onChange={handleChange}></input>
                    </Fade>
                    <Fade in={showForm}>
                        <input name="content" value={note.content} type="text" placeholder='Content' onChange={handleChange}></input>
                    </Fade>
                    <Fade in={showForm}>
                        <button onClick={handleClick}>
                            <AddIcon fontSize='medium'/>
                        </button>
                    </Fade>
                </div>
            }
        </div>
    );
};

export default Form;