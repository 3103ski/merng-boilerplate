import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage, RegisterPage, LoginPage, DashboardPage, UserSettingsPage } from './pages';
import AuthRoute from './util/AuthRoute.jsx';
import { MainNavigation } from './components';

import { AuthProvider } from './contexts/auth';
import { LANDING, LOGIN, REGISTER, DASHBOARD, USER_SETTINGS } from './routes.js';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function App() {
	return (
		<AuthProvider>
			<Router>
				<MainNavigation />
				<Route exact path={LANDING} component={LandingPage} />
				<Route exact path={LOGIN} component={LoginPage} />
				<Route exact path={REGISTER} component={RegisterPage} />
				<AuthRoute path={USER_SETTINGS} component={UserSettingsPage} />
				<AuthRoute exact path={DASHBOARD} component={DashboardPage} />
			</Router>
		</AuthProvider>
	);
}

export default App;
