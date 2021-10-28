const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cors = require('./auth/cors.js');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const { MONGODB } = require('./config');
const authRouter = require('./auth/authRoutes.js');

////•••••••••••••••••
// Setup server, database connection and port
////•••••••••••••••••

const connect = mongoose.connect(MONGODB, {
	useCreateIndex: true,
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		return { req };
	},
});

const app = express();
server.applyMiddleware({ app });

////•••••••••••••••••
//  App Setup
////•••••••••••••••••

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

////•••••••••••••••••
// Server Routes
////•••••••••••••••••
app.use('/auth', authRouter);

app.get('/', cors.cors, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(express.static(path.join(__dirname, 'views/index.html')));
});

////•••••••••••••••••
// server endpoint error handling
////•••••••••••••••••

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err });
});

////•••••••••••••••••
// Connect to MongoDB & GraphQL then run app on server PORT
////•••••••••••••••••

connect
	.then(() => {
		console.log('MongoDB :: CONNECTED  ::  Appollo / Atlas');
	})
	.then(() =>
		console.log(`GraphQL :: READY      ::  http://localhost:${PORT}${server.graphqlPath}`)
	)
	.then(() =>
		app.listen({ port: PORT }, () =>
			console.log(`Server  :: RUNNING    ::  http://localhost:${PORT}`)
		)
	)
	.catch((err) => console.log(err));
