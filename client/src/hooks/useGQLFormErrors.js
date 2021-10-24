import { useState } from 'react';

export default function useGQLFormErrors() {
	const [errors, setErrors] = useState({});

	const setFormError = (err) => {
		if (err.graphQLErrors[0]) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		}
	};

	const clearErrors = () => setErrors({});

	return { errors, setFormError, clearErrors };
}
