import React ,{useContext,useEffect} from "react";
import {Redirect ,Switch ,Link} from 'react-router-dom';
import './signin.css'
import {LoginContext} from '../../context/auth'
import cookie from 'react-cookies'
const  SignIn =  () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth =useContext(LoginContext)
  const handleLogin = async (e) => {

  
    e.preventDefault();
        var body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    auth.loginFunction(body.username , body.password )
    // console.log("+++++++++++++++",auth.loginFunction(body.username , body.password))
    auth.loginStatus(true)

  };
  return ( 
    <section className="GeeksForGeeks">
      <div className="container">

      <form onSubmit={handleLogin} className="loginForm">
        <br></br>
        <label>Username</label>
        <input type="text" name="username" required></input>
        <label>Password </label>
        <input type="password" name="password" required />
       
        <button className="buttonSignin">login </button>
      <Link to={'/signup'}>
            <p className='signinlink'>
              <i className='fa fa-sign-out'></i> Don't have account ?  Sign Up
            </p>
            </Link>
      </form>

     
    
      
    </div>

    {cookie.load('id') ?  <Switch>
      <Redirect from="*" to="/Dashboard" ></Redirect>
    </Switch>
  :<></>  
  }
    </section>
  );
};
export default SignIn;