import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { LandingPage, RegisterPage, LoginPage, DashboardPage } from './pages';
import AuthRoute from './util/AuthRoute.jsx';
import { Navbar } from './components';
import { AuthProvider } from './context/auth';
import './App.scss';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Route exact path={'/'} component={LandingPage} />
				<Route exact path={'/login'} component={LoginPage} />
				<Route exact path={'/register'} component={RegisterPage} />
				<AuthRoute exact path={'/user-dash'} component={DashboardPage} />
			</Router>
		</AuthProvider>
	);
}

export default App;
