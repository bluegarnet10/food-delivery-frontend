import React, { useState, useContext } from 'react';
import { MuiThemeProvider, RaisedButton, TextField } from 'material-ui';
import { useHistory } from 'react-router-dom';

import { SessionContext } from 'Contexts/SessionContext';

import styles from './Signin.module.scss';

const Signin = () => {
	const { requestUserSignin } = useContext(SessionContext);
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const handleValidation = (field, value) => {
		const error = {};
		error[field] = value ? '' : 'This field is required';
		return error;
	};

	const handleInputChange = e => {
		const field = e.target.id;
		const value = e.target.value;

		if (field === 'email') {
			setEmail(value);
		} else if (field === 'password') {
			setPassword(value);
		}

		const error = { ...errors, ...handleValidation(field, value) };
		if (errors.invalidCredentials) {
			delete errors.invalidCredentials;
		}
		setErrors(error);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const error = { ...errors, ...handleValidation('email', email), ...handleValidation('password', password) };
		const userCredentialsValid = Object.keys(error).filter(field => error[field] !== '').length === 0;
		if (!userCredentialsValid) {
			setErrors(error);
			return;
		} else {
			requestUserSignin(email, password).then(res => {
				if (res.errors) {
					setErrors(res.errors);
				} else {
					history.push('/');
				}
			});
		}
	};

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<>
					<h2>Sign in</h2>
					<TextField
						id="email"
						type="email"
						hintText="Enter your email"
						floatingLabelText="Email"
						className={styles.text_field}
						value={email}
						onChange={handleInputChange}
						errorText={errors.email || errors.invalidCredentials}
					/>
					<TextField
						id="password"
						type="password"
						hintText="Enter your password"
						floatingLabelText="Password"
						className={styles.text_field}
						value={password}
						onChange={handleInputChange}
						errorText={errors.password}
					/>
					<br />
					<RaisedButton type="submit" label="Sign in" primary={true} className={styles.button} />
					<RaisedButton
						type="button"
						label="Sign up"
						primary={true}
						className={styles.button}
						onClick={() => history.push('/signup')}
					/>
				</>
			</MuiThemeProvider>
		</form>
	);
};

export default Signin;
