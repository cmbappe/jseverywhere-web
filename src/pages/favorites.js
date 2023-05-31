import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect(() => {
         document.title = 'My Favorites - Notedly';
    });
    const {data, loading, error} = useQuery(GET_MY_FAVORITES);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>`Error! ${error.message}</p>;
    if(data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} />;
    } else{
        return <p>You haven't favorited any notes yet!</p>;
    }
    

};

export default Favorites;
