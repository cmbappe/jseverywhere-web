import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Layout from '../components/Layout';
import NotePage from './note';
import SingUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';
import { IS_LOGGED_IN } from '../gql/query';

const PrivateRoute = ({ component: Component, ...rest}) =>{
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
}
                    
const Pages = () => {
    return (
        <Router>
            <Layout>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites}/>
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/note/:id" component={NotePage} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                <Route path="/signup" component={SingUp} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </Router>
    );

};

export default Pages;

