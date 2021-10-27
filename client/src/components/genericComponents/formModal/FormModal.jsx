import React from 'react';
import { Modal } from 'semantic-ui-react';

export default function FormModal({
	size = 'small',
	formComponent: Form,
	isOpen,
	setIsOpen,
	header,
	...rest
}) {
	return (
		<Modal size={size} open={isOpen} onClose={() => setIsOpen(false)}>
			{header ? <Modal.Header>{header}</Modal.Header> : null}
			<Modal.Content>
				<Form {...rest} callback={() => setIsOpen(false)} />
			</Modal.Content>
		</Modal>
	);
}
