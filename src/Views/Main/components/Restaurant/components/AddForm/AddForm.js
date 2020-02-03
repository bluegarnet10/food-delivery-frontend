import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton, TextField } from 'material-ui';

import { RestaurantContext } from 'Contexts/RestaurantContext';

import styles from './AddForm.module.scss';

const AddForm = () => {
	const { addRestaurant } = useContext(RestaurantContext);
	const history = useHistory();

	console.log('add form');

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState({});

	const handleValidation = (field, value) => {
		const error = {};
		error[field] = value ? '' : 'This field is required';
		return error;
	};

	const handleInputChange = e => {
		const field = e.target.id;
		const value = e.target.value;

		if (field === 'name') {
			setName(value);
		} else if (field === 'description') {
			setDescription(value);
		}

		const error = { ...errors, ...handleValidation(field, value) };
		if (errors.invalidCredentials) {
			delete errors.invalidCredentials;
		}
		setErrors(error);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const error = {
			...errors,
			...handleValidation('name', name),
			...handleValidation('description', description),
		};
		const userCredentialsValid = Object.keys(error).filter(field => error[field] !== '').length === 0;
		if (!userCredentialsValid) {
			setErrors(error);
			return;
		} else {
			addRestaurant({ name, description }).then(res => {
				if (res.errors) {
					setErrors(res.errors);
				} else {
					history.push('/restaurant');
				}
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<>
					<h2>Add a restaurant</h2>
					<TextField
						id="name"
						hintText="Enter the name"
						floatingLabelText="name"
						className={styles.text_field}
						value={name}
						onChange={handleInputChange}
						errorText={errors.name}
					/>
					<TextField
						id="description"
						hintText="Enter the description"
						floatingLabelText="description"
						className={styles.text_field}
						value={description}
						onChange={handleInputChange}
						errorText={errors.description}
					/>
					<br />
					<RaisedButton type="submit" label="Add" primary={true} />
				</>
			</MuiThemeProvider>
		</form>
	);
};

export default AddForm;
