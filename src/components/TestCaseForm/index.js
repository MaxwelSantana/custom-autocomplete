import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './index.css';

function TestCaseForm() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = React.useState({
    description: 'teste case 1',
    customSteps: `enter "testlogin" in "username"
press "Next"
enter "Password123$" into "password"
press button one
press "Sign in"
press "Sign in with Apple"`,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit custom steps test case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please, enter test case description and steps</p>
          <Form>
            <Form.Group className="mb-3" controlId="testCaseForm.description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                value={state.description}
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="testCaseForm.customSteps">
              <Form.Label>Custom steps new line separated:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={state.customSteps}
                name="customSteps"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Update and Retest</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TestCaseForm;
