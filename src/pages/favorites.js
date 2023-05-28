import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Favorites = () => {
    useEffect(() => {
         document.title = 'My Favorites - Notedly';
    });
    return (
        <div>
            <p>These are my favorites</p>
        </div>
    );
};

export default Favorites;
