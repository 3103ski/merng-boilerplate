import gql from 'graphql-tag';

export const GET_USER = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			id
			email
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser($email: String) {
		updateUser(updateUserInput: { email: $email }) {
			id
			email
			createdAt
		}
	}
`;
