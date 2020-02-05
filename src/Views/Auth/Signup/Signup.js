import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton, TextField, SelectField, MenuItem } from 'material-ui';

import { SessionContext } from 'Contexts/SessionContext';

import styles from './Signup.module.scss';

const Signin = () => {
	const { requestUserSignup } = useContext(SessionContext);
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [role, setRole] = useState('user');
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
		} else if (field === 'name') {
			setName(value);
		}

		const error = { ...handleValidation(field, value) };
		setErrors(error);
	};

	const handleRoleChange = (e, index, value) => {
		setRole(value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const error = {
			...handleValidation('email', email),
			...handleValidation('password', password),
			...handleValidation('name', name),
		};
		const userCredentialsValid = Object.keys(error).filter(field => error[field] !== '').length === 0;
		if (!userCredentialsValid) {
			setErrors(error);
			return;
		} else {
			requestUserSignup(email, password, name, role).then(res => {
				if (res.errors) {
					setErrors(res.errors);
				} else {
					history.push('/signin');
				}
			});
		}
	};

	return (
		<form className={styles.wrapper} onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<>
					<h2>Sign up</h2>
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
					<TextField
						id="name"
						hintText="Enter your name"
						floatingLabelText="Name"
						className={styles.text_field}
						value={name}
						onChange={handleInputChange}
						errorText={errors.name}
					/>
					<SelectField
						value={role}
						onChange={handleRoleChange}
						floatingLabelText="Role"
						errorText={errors.role}
					>
						<MenuItem value="user" primaryText="User" />
						<MenuItem value="owner" primaryText="Restaurant Owner" />
					</SelectField>
					<br />
					<RaisedButton type="submit" label="Sign up" primary={true} className={styles.button} />
					<RaisedButton
						type="button"
						label="Sign in"
						primary={true}
						className={styles.button}
						onClick={() => history.push('/signin')}
					/>
				</>
			</MuiThemeProvider>
		</form>
	);
};

export default Signin;
