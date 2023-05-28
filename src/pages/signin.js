import React, {useEffect} from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const SIGN_IN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }`;

const SignIn = props => {
    useEffect(() => {
        document.title = 'Sign in - Notedely';
    }, []);
    
    const client = new useApolloClient();
    const [signIn, {loading, error }] = useMutation(SIGN_IN_USER, {
        onCompleted: data => {
            //store the token
            localStorage.setItem('token', data.signIn);
            //update the local cache
            client.writeData({ data: { isLoggedIn: true } });
            //redirect the user to the homepage
            props.history.push('/');
        }
    });

    return (
       <React.Fragment>
           <UserForm action={signIn} formType="signIn" />
           {loading && <p>Loading...</p>}
           {error && <p>Error signing in!</p>}
       </React.Fragment>
    );
}

export default SignIn;