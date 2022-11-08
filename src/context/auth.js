import React, { useState, useEffect } from "react";
import superagent from 'superagent';
import base64 from 'base-64';
import cookie from 'react-cookies';
import axios from 'axios';
// import { baseURL } from "../../utilize/constants";
import {API} from '../utilize'
const api =API
export const LoginContext = React.createContext();
export default function LoginProvider(props) {
 const [signUp,setSignUp]=useState(false)
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState({
        username: cookie.load('username') || "",
        actions: cookie.load('actions') || [],
        id:cookie.load('id')|| null 
    });

    useEffect(() => {
        const tokenFromCookies = cookie.load('token');
        const userId = cookie.load('id');

        if (tokenFromCookies) {
            setLoginStatus(true);
            setUser(user);
        } else {
            setLoginStatus(false);
            setUser({})
        }
    }, []);

    const SignUpFunction = async (username, password ) => {
      try {
            
         const userData = { username:`${username}`, password:`${password}`}
       let data = await axios.post(`${api}/signup` , userData)    
.then(setSignUp(true))
      } catch (err) {
          console.log(err)
         
      }
  }
    const loginFunction = async (username, password) => {
        try {
            const response = await superagent.post(`${api}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
           
            validateMyUser(response.body.user);
        } catch (err) {
return("error")
        }
    }
    const logoutFunction = () => {
        setLoginStatus(false);
        setUser({});
        cookie.remove('token');
        cookie.remove('username');
        cookie.remove('id');
       

      
    }
    const validateMyUser = (user ) => {
        if (user.token) {
            // const userFromToken = jwt.decode(user.token);
            console.log('user.token >>>> ', user.token);
            setLoginStatus(true);
            setUser(user);
            cookie.save('token', user.token);
            cookie.save('username', user.username);
            cookie.save('id', user.id);
         
           

            // const actionsCookie = JSON.stringify(user.actions);
            cookie.save('actions', user.capabilities)
        } else {
            setLoginStatus(false);
            setUser({});
        }
    }
    //read
   
    const state = {
        loginStatus: loginStatus,
        SignUpFunction:SignUpFunction,
        loginFunction: loginFunction,
        logoutFunction: logoutFunction,
        user: user,
        signUp:signUp,
        
    }
    return (
        
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}
