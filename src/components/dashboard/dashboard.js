import React, { useEffect, useState } from "react";
import cookie from 'react-cookies'
import axios from 'axios'
import './dashboard.css'
export default function Dashboard() {
const [userId , setUserId]=useState(cookie.load("id"))
 const [Products ,setProducts]=useState([])
const API = 'https://shop-backend-com.herokuapp.com'
const addProduct = async (e)=>{
e.preventDefault()
let productBody = { 
name : e.target.name.value ,
price : e.target.price.value,
quantity : e.target.quantity.value,
category : e.target.category.value,
imageURL1 : e.target.imageURL1.value,
}
JSON.stringify(productBody)
console.log('JSON.stringify(productBody): ', JSON.stringify(productBody));
let data = await axios.post(`${API}/addProduct` , productBody,

{
  headers: {
    Authorization: `Bearer ${cookie.load('token')}`,
  },
})
console.log('data: ', data);


}

const fetchProducts = async ()=>{
let data =await axios.get(`${API}/oneProduct/${userId}`,{
    headers: {
      Authorization: `Bearer ${cookie.load('token')}`,
    },
  })


setProducts(data.data)

}

const deleteProduct =async (id) => { 
let data = await axios.delete(`${API}/oneProduct/${userId}/${id}` , {
    headers: {
      Authorization: `Bearer ${cookie.load('token')}`,
    },
  })
console.log(data);
}
useEffect(()=>{
    fetchProducts()
},[Products])
  return (
    <div >
         { 
    !cookie.load('id') ?<> <h1>You Are Not Signed In  ? <a href="/signin"> sign In from here</a>   </h1></> : <>
    
    
    <div className="main-div">
        <h1>Publish Your Product !</h1> 
      </div>
      <div className="main-div" > 
      <form onSubmit={(e)=>addProduct(e)}>
        <label>Product Name</label>
        <input type="text" name="name"></input>
        <label>Product Price</label>
        <input type="number" name="price"></input>
        <label>Product Quantity</label>
        <input type="text" name="quantity"></input>
        <label>Product Category</label>
        <select name="category">
          <option>Laptops</option>
          <option>phones</option>
          <option>PC's</option>
        </select>
        <label>Image</label>
        <input type="text" name="imageURL1"></input>
        <button type="submit">Add product</button>
      </form>
    </div>
    <div className="userProducts"> 
{
    Products.map((item ,idx )=>{
        return(<div key={idx} className="userProducts"> 
        <div className="OneProductClass">
<h4>{item.name}</h4>
<img src={item.imageURL1}></img>
<button onClick={()=> deleteProduct(item.id)}> Delete </button> 
<button > Update </button> 
            </div>   
        </div>)
    })
}
    
    </div>
    
    
    </> }
   
    </div>
  );
}
