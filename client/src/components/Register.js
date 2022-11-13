import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";

function Register({setAuth}) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;
  //destructing email, password, name from useState and assigning to inputs

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }
  //need onChange for any change to happen
  //passing an event 
  //...inputs = every inputs
  //takes name from the input below and sets it to value

  const onSubmitForm = async(e) => {
    e.preventDefault() //preventDefault so that it hits e, it doesn't refresh page
  try {

    const body = {email, password, name}

    const response = await fetch("http://localhost:5000/auth/register", {
        method:"POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body),
    });
    //since this is not a simple get request, we have to do more 
    //have to stringify body 

    const parseRes = await response.json()
    //data we get will be json so we need to parse to utilize the data 

    // console.log(parseRes)

    localStorage.setItem("token", parseRes.token); //saving jwt token into localstorage

    setAuth(true); //make sure to pass setAuth as prop into Register function
    
  } catch (err) {
    console.error(err.message)
  }
}

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
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
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={e => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to= "/login">Login</Link>
    </Fragment>
  );
}

export default Register;
