import { useState } from 'react';

export default function useForm(callback, initialState = {}, options) {
	/** Destructured options */
	const { onChangeCB, emptyInputWhitelist = [], setErrors, formArray } = { ...options };

	/** if an array of form field object is passed into options, that can replace initial state */
	let formArrInitialState = {};
	if (formArray) formArray.map((f) => (formArrInitialState[f.name] = ''));

	/** Return states */
	const [values, setValues] = useState(formArray ? formArrInitialState : initialState);
	const [emptyInputErrors, setEmptyInputErrors] = useState([]);

	/** Check if a changing input is empty and allowed to be or not */
	const manageInput = async (key, val) => {
		/** If empty and not on whitelist, add key to error input */
		if (val === '' && !emptyInputWhitelist.includes(key)) {
			// But only if the key isn't already there
			if (!emptyInputErrors.includes(key)) return setEmptyInputErrors([...emptyInputErrors, key]);
		} else {
			/** If value is not empty but on the errorList, remove it */
			if (emptyInputErrors.includes(key)) {
				const updatedEmpties = emptyInputErrors.filter((i) => i !== key);
				return setEmptyInputErrors(updatedEmpties);
			}
		}
	};

	/** Handle change value on object data */
	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		manageInput(e.target.name, e.target.value);
		if (onChangeCB) onChangeCB();
	};

	/** hit callback if all required fields are present */
	const onSubmit = async (e) => {
		e.preventDefault();

		// Scan form for missing input using 'emptyInputWhitelist'
		const inputsWithMissingValues = [];
		for (const key in values) {
			if (values[key] === '' && !emptyInputWhitelist.includes(key)) await inputsWithMissingValues.push(key);
		}
		setEmptyInputErrors([...inputsWithMissingValues]);

		// If form is missing input, set errors and DO NOT callback()
		if (inputsWithMissingValues.length > 0 && setErrors)
			return setErrors({ [emptyInputErrors[0]]: `Missing fields` });

		// If all required inputs have a value hit callback()
		return callback();
	};

	return {
		/**Return Methods */
		onChange,
		onSubmit,
		/**Return States */
		values,
		emptyInputErrors,
	};
}
