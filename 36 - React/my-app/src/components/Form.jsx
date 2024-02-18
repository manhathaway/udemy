import React, { useState } from 'react';

const Form = (props) => {
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
        <div id="form">
            <input value={title} type="text" placeholder='Title' onChange={(event) => setTitle(event.target.value)}></input>
            <input value={content} type="text" placeholder='Content' onChange={(event) => setContent(event.target.value)}></input>
            <button type="submit" onClick={handleClick}>🡇</button>
        </div>
    );
};

export default Form;