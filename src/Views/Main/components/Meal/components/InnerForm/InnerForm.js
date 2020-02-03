import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { MuiThemeProvider, RaisedButton, TextField } from 'material-ui';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { MealContext } from 'Contexts/MealContext';

import styles from './InnerForm.module.scss';

const InnerForm = ({ restaurant_id, isEdit }) => {
	const { addMeal, updateMeal, meals } = useContext(MealContext);
	const { meal_id } = useParams();
	const activeItem = isEdit ? meals.find(item => item._id === meal_id) : null;
	const history = useHistory();

	const [name, setName] = useState(activeItem ? activeItem.name : '');
	const [description, setDescription] = useState(activeItem ? activeItem.description : '');
	const [price, setPrice] = useState(activeItem ? activeItem.price : '');
	const [errors, setErrors] = useState({});

	const handleValidation = (field, value) => {
		const error = {};
		if (field === 'price') {
			error[field] = value && Number(value) > 0 ? '' : 'This field is required';
		} else {
			error[field] = value ? '' : 'This field is required';
		}
		return error;
	};

	const handleInputChange = e => {
		const field = e.target.id;
		const value = e.target.value;

		if (field === 'name') {
			setName(value);
		} else if (field === 'description') {
			setDescription(value);
		} else if (field === 'price') {
			setPrice(value);
		}

		const error = { ...errors, ...handleValidation(field, value) };
		setErrors(error);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const error = {
			...errors,
			...handleValidation('name', name),
			...handleValidation('description', description),
		};
		const dataValid = Object.keys(error).filter(field => error[field] !== '').length === 0;
		if (!dataValid) {
			setErrors(error);
			return;
		} else {
			if (isEdit) {
				updateMeal(restaurant_id, { _id: meal_id, name, description, price: Number(price) }).then(res => {
					if (res.errors) {
						setErrors(res.errors);
					} else {
						history.push(`/restaurant/${restaurant_id}`);
					}
				});
			} else {
				addMeal(restaurant_id, { name, description, price: Number(price) }).then(res => {
					if (res.errors) {
						setErrors(res.errors);
					} else {
						history.push(`/restaurant/${restaurant_id}`);
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
							{`${isEdit ? 'Edit' : 'Add'} a meal`}
						</Typography>
						<TextField
							id="name"
							hintText="Enter the name"
							floatingLabelText="Name"
							className={styles.text_field}
							value={name}
							onChange={handleInputChange}
							errorText={errors.name}
						/>
						<TextField
							id="description"
							hintText="Enter the description"
							floatingLabelText="Description"
							className={styles.text_field}
							value={description}
							onChange={handleInputChange}
							errorText={errors.description}
						/>
						<TextField
							id="price"
							type="number"
							hintText="Enter the price"
							floatingLabelText="Price"
							className={styles.text_field}
							value={price}
							onChange={handleInputChange}
							errorText={errors.price}
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
	restaurant_id: PropTypes.string.isRequired,
	isEdit: PropTypes.bool,
};

InnerForm.defaultProps = {
	restaurant_id: '',
	isEdit: false,
};

export default InnerForm;
