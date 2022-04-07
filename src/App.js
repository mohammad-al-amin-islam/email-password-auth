import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";

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
    <div className="App">

      <form onSubmit={handleForm}>
        <input onBlur={handleTextOnBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handlePasswordOnBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}

export default App;
