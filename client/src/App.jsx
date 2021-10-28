import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage, RegisterPage, LoginPage, DashboardPage, UserSettingsPage } from './pages';
import { Navbar } from './components';

import AuthRoute from './util/AuthRoute.jsx';
import { AuthProvider } from './contexts/auth';
import { LANDING, LOGIN, REGISTER, DASHBOARD, USER_SETTINGS } from './routes.js';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Route exact path={LANDING} component={LandingPage} />
				<Route exact path={LOGIN} component={LoginPage} />
				<Route exact path={REGISTER} component={RegisterPage} />
				<AuthRoute exact path={DASHBOARD} component={DashboardPage} />
				<AuthRoute exact path={USER_SETTINGS} component={UserSettingsPage} />
			</Router>
		</AuthProvider>
	);
}

export default App;
