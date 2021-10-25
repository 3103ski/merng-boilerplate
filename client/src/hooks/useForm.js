import { useState } from 'react';

export default function useForm(callback, initialState = {}) {
	const [values, setValues] = useState(initialState);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
}
