import React from 'react';
import toaster from 'toasted-notes';
import { Alert } from '@material-ui/lab';

import 'toasted-notes/src/styles.css';

export const showNotification = (message, severity = 'success', autoCloseDelay = 3000, options = {}) => {
	toaster.notify(
		({ onClose }) => (
			<Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
				{message}
			</Alert>
		),
		{ ...options, duration: autoCloseDelay > -1 ? autoCloseDelay : null }
	);
};
