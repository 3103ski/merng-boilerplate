import gql from 'graphql-tag';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(loginInput: { email: $email, password: $password }) {
			id
			email
			token
			createdAt
		}
	}
`;

export const REGISTER_USER = gql`
	mutation register($email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: { email: $email, password: $password, confirmPassword: $confirmPassword }
		) {
			id
			email
			token
			createdAt
		}
	}
`;

export const UPDATE_PASSWORD = gql`
	mutation updatePassword(
		$password: String!
		$newPassword: String!
		$confirmNewPassword: String!
	) {
		updatePassword(
			updatePasswordInput: {
				password: $password
				newPassword: $newPassword
				confirmNewPassword: $confirmNewPassword
			}
		) {
			id
			email
			token
			createdAt
		}
	}
`;
