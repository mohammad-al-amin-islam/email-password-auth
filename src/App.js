import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const auth = getAuth(app);


function App() {

  const handleTextOnBlur = e => {
    console.log(e.target.value)
  }
  const handlePasswordOnBlur = e => {
    console.log(e.target.value)
  }
  const handleForm = e => {
    console.log('form is here')
    e.preventDefault();
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

      <div className="w-50 mx-auto mt-5 shadow-lg p-3">
        <h2 className="text-primary">Please Register</h2>
        <Form onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleTextOnBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordOnBlur} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>


    </div>
  );
}

export default App;
