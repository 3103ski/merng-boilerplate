import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage, RegisterPage, LoginPage, DashboardPage, UserSettingsPage } from './pages';
import AuthRoute from './util/AuthRoute.jsx';
import { MainNavigation } from './components';

import { AuthProvider } from './contexts/auth';
import { LANDING, LOGIN, REGISTER, DASHBOARD, USER_SETTINGS } from './routes.js';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

/**
 * *** All new Route components should have a path variable that comes from routes.js ***
 *
 * 			These route variables are also in default use
 * 			inside of '/client/src/components/navigation/[...].jsx' components
 *
 * 			!IMPORTANT :: Authentication will not work without setting up credentials in .env
 * 			SEE '/client/src/config.js' for details and setup
 *
 */

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
