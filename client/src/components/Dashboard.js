import React, {Fragment, useState, useEffect} from 'react'

 function Dashboard({setAuth}) {

    const [name, setName] = useState("");
    
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method:"GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json()
            // console.log(parseRes)
            setName(parseRes.user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false);
    }

    useEffect(() => {
        getName();
    }, []); //empty bracket is important so that useEffect only renders once
  return (
    <Fragment>
        <h1>Dashboard {name}</h1>
        {/* <button onClick={() => setAuth(false)}>Logout</button> 
        This button will logout and return back to login page
        */}
        <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
