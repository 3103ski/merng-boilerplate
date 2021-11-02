//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import React, { useEffect, useState } from 'react';
//~~~  React & Hooks
import { useForm } from '../../hooks/';

//~~~  Other Package Imports
import { Button } from 'semantic-ui-react';

//~~~  Local Components
import { RenderBasicForm } from '../../components/';

//~~~  Variables & Helpers
import { handleOnEnter } from '../../util/helperFunctions.js';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 *
 *
 *      MAKES USE OF LOCAL COMPONENT AND HOOK; DOES NOTHING WITHOUT THEM
 * 		Likely wont work for all forms but helped dry
 * 		out some redundant boiler.
 *
 * 		This template pattern was used in existing forms
 * 		but THIS TEMPLATE COMPONENT IS NOT IN USE OR INDEXED
 * 		YOU CAN DELETE IT IF YOU WONT NEED IT FOR REFERENCE
 *
 * 		---->> TO USE ::
 *      * MUST SETUP INPUTS ARR 'inputs'
 *      * Pass hook INITIAL STATE OR 'inputs' variable as 'formArray' into hook OPTIONS
 *      * PASS INPUTS ARR INTO FORM COMPONENT
 *      * currently for use with types: text, email, password
 * 		* OPTIONAL :: Callback will fire on cancel.
 *
 */

const formID = 'some_form';
const inputs = [{ name: 'username', type: 'text', placeholder: 'Type Username' }];

export default function SimpleFormTemplate({ callback }) {
	/** ********************************************************************** */
	/**
	 *  		The next two lines of code emulate server error control and loading state
	 * 			These two variables and two setters would be provided by either GQL hook
	 *  		or context methods
	 */
	const [serverErrors, setServerErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	/** ********************************************************************** */

	const {
		values,
		onChange,
		onSubmit,
		errorInputs: inputErrors,
	} = useForm(onSubmitHandler, null, {
		setErrors: setServerErrors,
		formArray: inputs,
		onChangeCB: () => setServerErrors({}),
	});

	function onSubmitHandler() {
		/** write your submit handler here; api call, qgl query, etc. */
		setIsLoading(true);
		console.log('form content: ', values);
		setTimeout(() => {
			console.log('all done!');
			return setIsLoading(false);
		}, 5000);
	}

	useEffect(() => {
		/**
		 * 		for whatever reason, the submit callback doesn't fire correctly
		 * 		onEnter when the form exists inside of semantic UI modal component.
		 * 		If this form is not inside a modal, you can remove this
		 * 		whole useEffect block.
		 */

		const form = document.getElementById(formID);
		const updateOnEnterHandler = (e) => handleOnEnter(e, onSubmitHandler);

		form.addEventListener('keydown', updateOnEnterHandler);
		return () => form.removeEventListener('keydown', updateOnEnterHandler);
	});

	return (
		<RenderBasicForm
			id={formID}
			inputs={inputs}
			values={values}
			onChange={onChange}
			onSubmit={onSubmit}
			isLoading={isLoading}
			inputErrors={inputErrors}
			serverErrors={serverErrors}
			buttons={() => (
				<>
					{/* ADD OR CHANGE BUTTONS HERE */}
					<Button onClick={callback}>Cancel</Button>
					<Button type='submit' primary>
						Update
					</Button>
				</>
			)}
		/>
	);
}
