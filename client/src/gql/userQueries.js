import gql from 'graphql-tag';

export const GET_USER = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			id
			email
			displayName
			spotifyId
			googleId
			facebookId
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser($email: String, $displayName: String) {
		updateUser(updateUserInput: { email: $email, displayName: $displayName }) {
			id
			email
			displayName
			createdAt
		}
	}
`;
