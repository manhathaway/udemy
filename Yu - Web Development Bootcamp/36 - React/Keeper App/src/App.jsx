import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import Form from './components/Form';

const App = () => {
    const [notes, setNotes] = useState([]);
    const handleClick = (note) => {
        setNotes([...notes, {
            title: note.title,
            content: note.content
        }]);
    };

    const removeNote = (id) => {
        setNotes((previous) => previous.filter((note, index) => index !== id));
    };

    return (
        <>
            <Header />
                <Form function={handleClick}/>
                {notes.map((note, index) => <Note key={index} id={index} title={note.title} content={note.content} function={removeNote}/>)}
            <Footer />
        </>
    );
};

export default App;