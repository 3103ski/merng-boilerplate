# MERNG Boilerplate

## MERN + G

This boilerplate is esentially MERN (Mongo, Express, React, Node) stack with GraphQL worked into it.
The practices will be updated to improve over time and a better approach with the same tech may be
updated without much versioning control; so if you stumble on this boiler and like it as it is, I
suggest you clone the repo and keep a copy somewhere else or just keep up with these docs.. or
change it. Make It better. Just saving time.

<br>

### Versions

The front and back end package versions might break with the latest versions of dependancies. Update
a package at the risk of something not working. I will try to keep this to date best I can.

<br>

### Git

Remove the `.git` folder from the boiler root folder. ` git init` your own git in there or create
one inside of the `server` and `client` folders respectively.

<br>

### Core Tech Versions

-   `react v17.0.2`
-   `graphql v15.6.1`
-   `express v4.17.1`
-   `node v14.9.0`
-   `@apollo/client v3.3.21`
-   `apollo-link-context v1.0.20`

<br>

### Other Tech

-   _Apollo Server_: Used on client and server to impliment `GraphQL`
-   _MongoDB Atlas_: hosting for Mongo DB
-   _Sass_: I use sass modules in each component; but also like to manage a global sass folder for
    `variables` and `mixins`
-   _Semantic UI_: Ready to import and use `semantic ui` react in project.
-   _jwt-decode_: Used to `decrypt tokens` on the client side
-   _jsonwebtoken_: `generate tokens` on the server
-   _bcrypt_: `encrypts password` on server side for new users not using oAuth
-   _Mongoose_: Helps manage MongoDB schema and collections

## <br>

---

# Getting Started

1. Go to MongoDB.com and create an `Atlas cluster`. Select that cluster and choose "connect app",
   then use that link in `server/config.js`. If you are not using Atlas, you can also assign any URL
   to a mongodb database to the `MONGODB` config variable and it should work out.
2. If you do not have `nodemon` installed globally on your machine, you can install it or change the
   start script in `server/package.json` from `nodemon index.js` to `node index.js`
3. Run `npm start` in both the **server & client** directories.
4. Create a git repos for both server and client
5. I user **Netlify** for my client repos and **Heroku** for server; use those or whatever you
   prefer, then add your production server URL to the `GQL_SERVER_URL` variable in
   `/client/src/config.js`
6. By default, `/client/src/ApolloProvider.jsx` is pointed to the `GQL_TESTING_SERVER_URL` config
   variable, switch it to `GQL_SERVER_URL` anytime you are not making changes to a local version of
   the server.

<br>

---

# Client Side

## **Component Directories**

All concerns are separated into folder structures each containing an `index` file. This file acts as
a directory aggregating and exporting all files that directoy should be exporting.

### Example

> Folder Structure

```
    - components/
      |_ componentA/
        |_ ComponentA.jsx
        |_ componentA.module.scss
      |_ componentB/
        |_ ComponentB.jsx
        |_ componentB.module.scss
      |_ index.js
```

> _ComponentA.jsx_

```
    import React from 'react;
    export default function ComponentA() => some jsx stuff
```

<br>

> _ComponentB.jsx_

```
    import React from 'react;
    export default function ComponentB() => some jsx stuff
```

<br>

> _index.js_

```
    export {default as ComponentA} from './componentA/ComponentA.jsx
    export {default as ComponentB} from './componentB/ComponentB.jsx
```

<br>

> _SomeComponent.jsx_

```
    import { ComponentA, ComponentB } from '../components';

    export default function SomeComponent() => (
        <>
            <ComponentA />
            <ComponentB />
        </>
    )
```

<br>

## **CONFIG**

> `/client/src/config.js`

-   `TOKEN_TITLE`: Set global variable for token label. Default: `jwtToken`
-   `GQL_TESTING_SERVER_URL`: default value is _http://localhost:5000/graphql_
-   `GQL_SERVER_URL`: URL for production server

> **_make sure to switch to `GQL_SERVER_URL` inside of `client/src/ApolloProvider.jsx` when not
> working on local version_**

<br>

## **SASS Modules & Styling**

### _Component scoped styling_

Each component folder containers two files: `TheComponent.jsx` and `theComponent.module.scss`

These docs wont include an explaination of how css modules work, but using these scoped styles
should be implimented for components as below:

<br>

> _TheComponent.jsx_

```
import * as style from './theComponent.module.scss

export default TheComponent() => (
    <div className={style.Wrapper}>
        {...}
    <div/>
)
```

<br>

> _theComponent.module.scss_

```
@import '../sass';      // use correct path to SASS folder in root

.Wrapper {
    // some styles
}
```

<br>

### _Global Sass_

The `sass` folder in the client src folder has two folders: `mixins` and `variables`. A sass file
anywhere in the project gets access to everything by using `@import` inside your sass module. All
sass files are separated into partials and managed by the `index.scss` files in each directory.

> sass folder structure example

```
    - sass/
      |_ mixins/
        |_ _flexbox.scss
        |_ index.scss
      |_ variables/
        |_ _colors.scss
        |_ index.scss
      |_ index.scss
```

<br>

---

# Server Side

## **GraphQL**

### Resolvers

All resolvers categorized into separate files then aggregated into the `index.js` file in the
`resolvers` directory.

<br>

> `server/graphql/resolvers/users.js`

```
module.exports = {
	Query: {
		async getUser(_, { userId }) {
			{...}
		},
		async getUsers() {
			{...}
		},
	},
	Mutation: {
		async login(_, { loginInput: { email, password } }) {
			{...}
		},
		async register(_, { registerInput: {  email, password, confirmPassword } }) {
			{...}
		},
	},
};

```

<br>

> `server/graphql/resolvers/index.js`

```
const userResolvers = require('./users');

module.exports = {
	Query: {
		...userResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
};
```

<br>

---

# Building On User Template

The foundation of the user template is super basic. You can register a new user with an email and
password which will admit you to a protected page sample. You can update password and change login
email in a basic settings starter.

<br>

## Auth Context

> client/src/context/**auth.js**

### Context Variables

-   `user` : the login success will store a decoded version of the token here and also clear it if
    the page loads with an expired token.

### Context Methods

-   `loginSuccess` : accepts a `user` that contains a token from successful login; stores token in
    local storage and adds user data to auth context
-   `logout` : will clear token in local storage and and remove decrypted token data from `user`
    context variable
-   `updateUserInfo` : will accept an `object` that contains updated user values. _Will not update
    user password_.
