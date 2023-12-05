import { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalCustomType from '../../types/Modal';
import { useNameStore } from '../../zustand/store';
import './Modal.css';

function ModalCustom(props: ModalCustomType) {
	const [show, setShow] = useState(true);
	const { button, type, heading } = props;
	const { updateName } = useNameStore();
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateName(inputValue);
		setShow(false);
	};

	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>{heading}</Modal.Title>
			</Modal.Header>
			{type === 'login' ? (
				<Modal.Body>
					<Form action="" onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Control
								type="text"
								placeholder="Username"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
						</Form.Group>
						<Button className="btn-handle" type="submit">
							{button}
						</Button>
					</Form>
				</Modal.Body>
			) : (
				<Modal.Body>....</Modal.Body>
			)}
		</Modal>
	);
}

export default ModalCustom;
