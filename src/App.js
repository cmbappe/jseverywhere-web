// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context'
import Pages from './pages'
import GlobalStyle from './components/GlobalStyle';

const uri = process.env.API_URI;
const httpLink = createHttpLink({uri});
const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    }
});
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    link: authLink.concat(httpLink),
    cache: cache,
    connectToDevTools: true
    }
);

//Check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

//Write the cahe data on initial load
cache.writeData({data});
//Write the cache data after cache is reset
client.onResetStore(() => cache.writeData({data}));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));