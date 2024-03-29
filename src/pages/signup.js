import React, { useEffect, useState} from "react";
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from "../components/UserForm";
import { SINGNUP_USER } from "../gql/mutation";

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
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Loading...</p>}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SingUp;