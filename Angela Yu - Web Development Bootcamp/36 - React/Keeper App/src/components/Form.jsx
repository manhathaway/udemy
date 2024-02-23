import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/AddCircleRounded';

import { Fade } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

const Form = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let newTitle;
    let newContent;

    const handleClick = () => {
        if (title.length !== 0 && content.length !== 0) {
            newTitle = title;
            newContent = content;
            props.function(newTitle, newContent);
        } else if (title.length !== 0) {
            setContent("Enter some content here.");
            setTimeout(() => setContent(""), 1500)
        } else if (content.length !== 0) {
            setTitle("Enter a title here.");
            setTimeout(() => setTitle(""), 1500)
        } else {
            setTitle("Enter a title here.");
            setContent("Enter some content here.");
            setTimeout(() => {
                setTitle("");
                setContent("");
            }, 1500);
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
                        <input value={title} type="text" placeholder='Title' onChange={(event) => setTitle(event.target.value)}></input>
                    </Fade>
                    <Fade in={showForm}>
                        <input value={content} type="text" placeholder='Content' onChange={(event) => setContent(event.target.value)}></input>
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