import { gql } from "@apollo/client";

const SINGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SIGN_IN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }`;

    const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;

const EDIT_NOTE = gql`
    mutation updateNote($id: ID!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
    `;

const DELETE_NOTE = gql`
    mutation deleteNote($id: ID!) {
        deleteNote(id: $id)
    }
`;
const TOGGLE_FAVORITE = gql`
    mutation toggleFavorite($id: ID!) {
        toggleFavorite(id: $id) {
            id
            favoriteCount
        }
    }
`;

export {SINGNUP_USER, SIGN_IN_USER, NEW_NOTE, EDIT_NOTE, DELETE_NOTE, TOGGLE_FAVORITE};