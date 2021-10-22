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

Remove the `.git` folder from the boiler root folder. ` git init` your own git in there or create
one inside of the `server` and `client` folders respectively.

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

# Front-End

## **Component Directories**

All concerns taht are separated into folder structures may have be as elaborate as you want as long
as you map the `index.js` file of that directory to that file and export it. This makes it
easy/cleaner to import a lot of stuff from a directory into a file,

### Example

> Example folder structure

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

> _componentA.jsx_

```
    import React from 'react;

    export default function ComponentA() => some jsx stuff
```

<br>

> _componentB.jsx_

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

## **config.js file**

-   `TOKEN_TITLE`: The front end auth stores a json web token in local storage. You can set this
    variable to name that token whatever you want in local storage.

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
