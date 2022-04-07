import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');

  const handleEmailOnBlur = e => {
    setEmail(e.target.value);
  }
  const handlePasswordOnBlur = e => {
    setPassword(e.target.value)
  }

  const handleChecked = e => {
    setRegistered(e.target.checked);
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

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(res => {
          const user = res.user;
          console.log(user);
        })
        .catch(error => {
          setError(error.message)
          console.error(error);
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          sendVerificationMail();
          updateName();
        })
        .catch(error => {
          setError(error.message);
        })
    }

  }

  const sendVerificationMail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Verification mail sent');
      })

  }

  const handleResetPassWord = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Reset mail sent')
      })
  }

  const handleName = e => {
    setName(e.target.value);
  }

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name');
      })
      .catch(error => {
        setError(error.message);
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
        <h2 className="text-primary text-center">Please {registered ? 'login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleForm}>
          {!registered && <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Give your name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please give a valid email.
            </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailOnBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please give a valid Name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordOnBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please give a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleChecked} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p>{error}</p>
          <Button onClick={handleResetPassWord} variant="link">Forgot Password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
