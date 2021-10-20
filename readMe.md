# MERNG Boilerplate

## MERN + G

This boilerplate is esentially MERN (Mongo, Express, React, Node) stack with GraphQL worked into it.
The practices will be updated to improve over time and a better approach with the same tech may be
updated without much versioning control; so if you stumble on this boiler and like it as it is, I
suggest you clone the repo and keep a copy somewhere else or just keep up with these docs.. or
change it. Make It better. Just saving time.

### Versions

The front and back end package versions might break with the latest versions of dependancies. Update
a package at the risk of something not working. I will try to keep this to date best I can.

### Git

Remove the `.git` folder from the boiler root folder. `git init` your own git in there or create one
inside of the `server` and `client` folders respectively.

### Other Tech

-   _Apollo Server_: Used on client and server to impliment `GraphQL queries`
-   _Sass_: I use sass modules in each component; but also like to manage a global sass folder for
    `variables` and `mixins`
-   _Semantic UI_: Ready to import and use `semantic ui` react in project.
-   _jwt-decode_: Used to `decrypt tokens` on the client side
-   _jsonwebtoken_: `generate tokens` on the server
-   _bcrypt_: `encrypts password` on server side for new users not using oAuth
-   _Mongoose_: Helps manage MongoDB schema and collections

# Front-End Component Directories

All parts of the boilerplate are separated and include their own `index.js` files to serve as the
folder directory.

### Example

folder structure

    - components/
      |_ componentA/
        |_ ComponentA.jsx
        |_ componentA.module.scss
      |_ componentB/
        |_ ComponentB.jsx
        |_ componentB.module.scss
      |_ index.js

_componentA.jsx_

    import React from 'react;
    export default function ComponentA() => some jsx stuff

_componentB.jsx_

    import React from 'react;
    export default function ComponentB() => some jsx stuff

_index.js_

    export {default as ComponentA} from './componentA/ComponentA.jsx
    export {default as ComponentB} from './componentB/ComponentB.jsx

_SomeComponent.jsx_

    import { ComponentA, ComponentB } from '../components';

    export default function SomeComponent() => (
        <>
            <ComponentA />
            <ComponentB />
        </>
    )
