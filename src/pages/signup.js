import React, { useEffect, useState} from "react";
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from "../components/UserForm";

const SINGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SingUp = props => {
    const [values, setValues] = useState();
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    
    useEffect (() => {
        document.title = "Sign up - Notedly";
    });

    const client = useApolloClient();
    const [signUp, {loading, error}] = useMutation(SINGNUP_USER, {
        onCompleted: data => {
        localStorage.setItem('token', data.signUp);
        client.writeData({ data: { isLoggedIn: true } });
        props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" values={values} onChange={onChange} />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SingUp;