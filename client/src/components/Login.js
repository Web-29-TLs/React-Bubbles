import React, {useState} from "react";

//utils
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initState = {
  username: '', 
  password: ''
}

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState(initState);

  //creates controlled form inputs
  const changeHandler = e => {
    e.preventDefault();
    let value = e.target.value
    setUser({
      ...user, 
      [e.target.name]: value
    })
  }

  //logs user in when they hit submit
  const submit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then(res => {
        // console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles');
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      {/* <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p> */}
      <form onSubmit = {submit}>
        <input type = 'text' onChange = {changeHandler} placeholder = 'Username' name = 'username' value = {user.username}/>
        <input type = 'text' onChange = {changeHandler} placeholder = 'Password' name = 'password' value = {user.password} />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
