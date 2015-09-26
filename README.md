![screenshot](http://i.imgur.com/cRUIsqK.png)
# Hapi Universal Redux
Fork from Luandro's [Hapi Universal Redux](https://github.com/luandro/hapi-universal-redux). A little less opinionated with latest versions of most dependencies.

Isomorphic starterkit with server-side React rendering using
[npm](https://www.npmjs.com/),
[piping](https://github.com/mdlawson/piping),
[webpack](https://webpack.github.io/),
[webpack-dev-server](https://github.com/webpack/webpack-dev-server),
[hapi.js](http://www.hapijs.com/),
[babel.js](http://babeljs.io/),
[react.js](https://facebook.github.io/react),
[redux](https://github.com/gaearon/redux),
[react-router](https://github.com/rackt/react-router),
[react-hot-loader](https://gaearon.github.io/react-hot-loader)

## Features

- Fully automated with npm run scripts
- Server hot reloads with piping and Hapi.js
- Webpack for watch + production builds
- React.js + Router on the client and server
- React Hot Loader for instant client updates
- Babel.js automatically compiles ES6 + ES7
- Serverside rendering and hydration
- Redux for managing app state

It just works out-of-the-box.

## Installation

```bash
	git clone https://github.com/bfollington/react-redux-isomorphic-boilerplate.git
	cd react-redux-isomorphic-boilerplate

	npm install
	npm run dev     # changed from original for ease

	# production build and run
	NODE_ENV=production npm run build
	NODE_ENV=production npm run start
```

## Usage

Run `npm run dev` in your terminal and play with `views/Main.js` to get a feel of the server-side rendering and client-side hot updates.


## License

Original code:

BSD 3-Clause license. Copyright © 2015, Rick Wong and Luandro. All rights reserved.
