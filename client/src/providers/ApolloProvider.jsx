import React from 'react';

import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import App from '../App';

import { TOKEN_TITLE } from '../config';
import { GQL_SERVER_URL } from '../routes.js';

const httpLink = createHttpLink({
	uri: GQL_SERVER_URL,
});

const authLink = setContext(() => {
	const token = localStorage.getItem(TOKEN_TITLE);
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const cache = new InMemoryCache();

async function persist() {
	await persistCache({
		cache,
		storage: new LocalStorageWrapper(window.localStorage),
	});
}
persist();

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
});

const Provider = () => {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
};

export default Provider;
