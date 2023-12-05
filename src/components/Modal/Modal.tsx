import { FormEvent, useState, useEffect, ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ModalCustomType } from '../../types/Modal';
import { useNameStore } from '../../zustand/store';
import './Modal.css';

function ModalCustom(props: ModalCustomType) {
	const [show, setShow] = useState(true);
	const { button, type, message, heading, error } = props;
	const { updateName } = useNameStore();
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue === '') {
			alert('enter your name');
		} else {
			updateName(inputValue);
			setShow(false);
		}
	};

	const handlePlayAgain = () => {
		window.location.reload();
	};

	useEffect(() => {
		if (error) {
			setShow(true);
		}
	}, [error]);

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
							<Form.Label className="mt-3">{message ? message : ''}</Form.Label>
						</Form.Group>
						<Button className="btn-handle" type="submit">
							{button}
						</Button>
					</Form>
				</Modal.Body>
			) : (
				<Modal.Body>
					<Form action="" onSubmit={handlePlayAgain}>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>{message ? message : ''}</Form.Label>
						</Form.Group>

						<Button className="btn-handle" type="submit">
							{button}
						</Button>
					</Form>
				</Modal.Body>
			)}
		</Modal>
	);
}

export default ModalCustom;
