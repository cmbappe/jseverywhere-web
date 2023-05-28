import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const MyNotes = () => {
    useEffect(() => {
         document.title = 'My Notes - Notedly';
    });
    return (
        <div>
            <p>These are my notes</p>
        </div>
    );
};

export default MyNotes;
