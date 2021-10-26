import React from 'react';

import GoogleLogin from 'react-google-login';
import { Button } from 'semantic-ui-react';

export default function CustomButton() {
	return <Button>Button</Button>;
}

CustomButton.GoogleLoginBtn = function () {
	const responseGoogle = (response) => {
		console.log('Google Said: ', response);
	};

	return (
		<GoogleLogin
			clientId='555560470011-lm5fdsua6hfgtfl83vao6voj7sb9tg3b.apps.googleusercontent.com'
			// className={style.FacebookLoginBtn}
			buttonText='Login'
			render={(renderProps) => (
				<Button onClick={renderProps.onClick}>
					{/* <img src='/assets/icons/google.png' alt='spotify' /> */}
					Google Login
				</Button>
			)}
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
		/>
	);
};
