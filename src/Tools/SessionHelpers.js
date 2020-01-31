import jwt from 'jsonwebtoken';

export const checkAuthentication = () => {
	const authorizationToken = localStorage.getItem('jwtToken');
	if (authorizationToken == null) {
		return false;
	}
	try {
		jwt.decode(authorizationToken);
		return true;
	} catch (err) {
		return false;
	}
};

export const getUsername = () => {
	if (checkAuthentication() ? localStorage.getItem('username') : '');
};
