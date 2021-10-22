import React from 'react';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';

import App from './App';

import { TOKEN_TITLE, GQL_TESTING_SERVER_URL } from './config';

const httpLink = createHttpLink({
	uri: GQL_TESTING_SERVER_URL,
});

const authLink = setContext(() => {
	const token = localStorage.getItem(TOKEN_TITLE);
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const Provider = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

export default Provider;
