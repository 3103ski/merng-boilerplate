import React from 'react';

import { Form } from 'semantic-ui-react';

import { FormErrors, Loader } from '..';
import { checkForKey } from '../../util/helperFunctions.js';

/**
 * 		This component was made to follow a pattern that may be specific to
 * 		the auth forms of this boiler. If it doesn't make sense to what you're
 * 		doing, dont bend your mind to use it. Leave it for the existing
 * 		implimentations and move on.
 */

export default function RenderBasicForm({
	onSubmit,
	isLoading,
	inputs,
	id,
	emptyInputErrors,
	errors,
	onChange,
	values,
	buttons: Buttons,
}) {
	return (
		<>
			<Form onSubmit={onSubmit} id={id}>
				{isLoading ? <Loader loadingText='Logging In' /> : null}
				{inputs.map((f) => (
					<Form.Input
						error={emptyInputErrors.includes(f.name) || checkForKey(errors, f.name)}
						type={f.type}
						onChange={onChange}
						value={values[f.name]}
						name={f.name}
						placeholder={f.placeholder}
					/>
				))}
				<Buttons />
			</Form>
			<FormErrors errors={errors} />
		</>
	);
}
