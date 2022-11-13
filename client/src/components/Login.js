import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async(e) => {
    e.preventDefault() //preventDefault so that it hits e, it doesn't refresh page
  try {

    const body = {email, password }


    const response = await fetch("http://localhost:5000/auth/login", {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
    });

    const parseRes = await response.json()
    // console.log(parseRes)

//     if (parseRes.token) {
//         localStorage.setItem("token", parseRes.token);
//         setAuth(true);
//         toast.success("login successful!")
// }   else {
//     setAuth(false)
//     toast.error(parseRes)
// }


    
    
  } catch (err) {
    console.error(err.message)
  }
}

  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      {/* <button onClick={() => setAuth(true)}>Authenticate</button> 
            This button will open up dashboard because dashboard is originally set at false, and this is setting it to true
        */}
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={e => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={e => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
