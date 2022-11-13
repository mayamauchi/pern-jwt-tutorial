import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  //false because we want to make sure in the beginning, the user is authenticated as false
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()

      console.log(parseRes)

      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  },[]);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard"/>}
              //if user is unauthenticated, go to login. If authenticated, navigate to dashboard
              //passing in setAuth variable and the setAuth function that we created 
            />
            <Route
              exact
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}
              //if user is unauthenticated, go to register. If authenticated, navigate to login

            />
            <Route
              exact
              path="/dashboard"
              element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login"/>}
              //if user is authenticated, go to dashboard. Otherwise, navigate to login
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
