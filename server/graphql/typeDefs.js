const { gql } = require('apollo-server-express');

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}
	input RegisterInput {
		email: String!
		password: String!
		confirmPassword: String!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	type Query {
		getUser(userId: ID!): User
		getUsers: [User]
	}

	type Mutation {
		# Auth
		register(registerInput: RegisterInput): User!
		login(loginInput: LoginInput): User!
	}
`;
