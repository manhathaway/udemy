import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import Form from './components/Form';

const App = () => {
    const [notes, setNotes] = useState([]);
    const handleClick = (title, content) => {
        setNotes([...notes, {
            title: title,
            content: content
        }]);
        console.log(notes);
    };

    const removeNote = (id) => {
        setNotes((previous) => previous.filter((note, index) => index + 1 !== id));
    };

    return (
        <>
            <Header />
                <Form function={handleClick}/>
                {notes.map((note, index) => <Note key={index + 1} id={index + 1} title={note.title} content={note.content} function={removeNote}/>)}
            <Footer />
        </>
    );
};

export default App;