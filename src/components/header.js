import React ,{useContext} from 'react'
import {LoginContext} from '../context/auth'


export default function Header(){
    const auth =useContext(LoginContext)

    return(<>
    

    <div className="header">
<nav >
<a href="/">Home</a>
<a href="/productDetails" >Products</a>
<a href="/Dashboard">Dashboard</a>
<a href="/signup">Register</a>

<a href="/cart"><i class="fa fa-cart-plus" aria-hidden="true"></i></a>

<span onClick={()=>auth.logoutFunction()} className="logout"><i class="fa fa-sign-out" aria-hidden="true"></i></span>



</nav>




    </div>
    
    
    
    </>)
}