import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LandingPage, RegisterPage, LoginPage, DashboardPage, UserSettingsPage } from './pages';
import { Navbar } from './components';

import AuthRoute from './util/AuthRoute.jsx';
import { AuthProvider } from './context/auth';

import 'semantic-ui-css/semantic.min.css';
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
				<AuthRoute exact path={'/user-settings'} component={UserSettingsPage} />
			</Router>
		</AuthProvider>
	);
}

export default App;
