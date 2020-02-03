import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton, TextField } from 'material-ui';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { RestaurantContext } from 'Contexts/RestaurantContext';

import styles from './InnerForm.module.scss';

const InnerForm = ({ isEdit }) => {
	const { addRestaurant, updateRestaurant, restaurants } = useContext(RestaurantContext);
	const { id } = useParams();
	const activeItem = isEdit ? restaurants.find(item => item._id === id) : null;
	const history = useHistory();

	const [name, setName] = useState(activeItem ? activeItem.name : '');
	const [description, setDescription] = useState(activeItem ? activeItem.description : '');
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
			if (isEdit) {
				updateRestaurant({ _id: id, name, description }).then(res => {
					if (res.errors) {
						setErrors(res.errors);
					} else {
						history.push('/restaurant');
					}
				});
			} else {
				addRestaurant({ name, description }).then(res => {
					if (res.errors) {
						setErrors(res.errors);
					} else {
						history.push('/restaurant');
					}
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<MuiThemeProvider>
				<Card>
					<CardContent className={styles.content}>
						<Typography variant="h4" component="h4">
							{`${isEdit ? 'Edit' : 'Add'} a restaurant`}
						</Typography>
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
					</CardContent>
					<CardActions className={styles.actions}>
						<RaisedButton type="submit" label={isEdit ? 'Edit' : 'Add'} primary={true} />
					</CardActions>
				</Card>
			</MuiThemeProvider>
		</form>
	);
};

InnerForm.propTypes = {
	isEdit: PropTypes.bool,
};

InnerForm.defaultProps = {
	isEdit: false,
};

export default InnerForm;
