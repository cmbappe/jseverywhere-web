import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Note from '../components/Note';

const GET_NOTE = gql`
    query note($id: ID!){
        note(id: $id){
            id
            createdAt
            content
            favoriteCount
            author{
                id
                username
                avatar
            }
        }
    }`;

const notePage = props => {
    const id = props.match.params.id;
    const {loading, error, data} = useQuery(GET_NOTE, {variables:id});

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error! Note not found</p>
    return <Note note={data.note}/>;
};

export default notePage;