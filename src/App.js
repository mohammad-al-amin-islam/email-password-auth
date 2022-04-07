import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState } from "react";

const auth = getAuth(app);


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleEmailOnBlur = e => {
    setEmail(e.target.value);
  }
  const handlePasswordOnBlur = e => {
    setPassword(e.target.value)
  }
  const handleForm = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password should contain a special character');
      return;
    }
    setError('');

    setValidated(true);


    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div>

      {/* <form onSubmit={handleForm}>
        <input onBlur={handleTextOnBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handlePasswordOnBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Log In" />
      </form> */}

      <div className="w-50 mx-auto mt-5 shadow-lg p-3 rounded">
        <h2 className="text-primary text-center">Please Register</h2>
        <Form noValidate validated={validated} onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailOnBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please give a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordOnBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please give a password.
            </Form.Control.Feedback>
          </Form.Group>
          <p>{error}</p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
