import React,{useState ,useEffect,useContext} from 'react';
import { useParams ,Switch, Redirect  } from 'react-router-dom';
import axios from 'axios'
import cookie from 'react-cookies'
import './products.css';
import {LoginContext} from '../../context/auth'

import {API} from '../../utilize'
const api =API




export default function SingleProduct(){
  const auth =useContext(LoginContext)

const param =useParams()
const [id ]=useState(parseInt(param.id))
const [product ,setProduct]=useState([])
const [userId]=useState(cookie.load('id'))
const [update ,setUpdate]=useState(false)
const [updated ,setUpdated]=useState(false)
const [deleted , setDeleted]=useState(false)
const fetchProduct =async ()=>{


    let data =await axios.get(`${api}/products/${id}`)
    if(data){
        setProduct(data.data)
        console.log(data.data);
    }
}

useEffect(()=>{
    fetchProduct()
},[updated])
const updateProductData = async (e) => {
  e.preventDefault();

  let bodyData = {
    name: e.target.name.value,
    price: e.target.price.value,
    quantity: e.target.quantity.value,
    category: e.target.category.value,
    imageURL1: e.target.imageURL1.value,
  };
  


  console.log(`${api}/oneProduct/${userId}/${id}` , JSON.stringify(bodyData));
  let data = await axios.put(`${api}/oneProduct/${userId}/${id}`,
  
    bodyData,
    {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    }
  );
  if (data.data.length > 0) {
    console.log(data);
    setUpdate(false)
    setUpdated(true)
   
  }
};
const deleteProduct = async (id) => {
  await axios.delete(`${api}/oneProduct/${userId}/${id}`, {
    headers: {
      Authorization: `Bearer ${cookie.load("token")}`,
    },
  });
  //alert 
  setDeleted(true)
};

return(<>

{update ?<> 

  <div className="main-div">
<form onSubmit={(e) => updateProductData(e)}>
  <label>Product Name</label>
  <input type="text" name="name" ></input>
  <label>Product Price</label>
  <input type="number" name="price"></input>
  <label>Product Quantity</label>
  <input type="text" name="quantity"></input>
  <label>Product Category</label>
  <select name="category" >
    <option>Laptops</option>
    <option>phones</option>
    <option>PC's</option>
  </select>
  <label>Image</label>
  <input type="text" name="imageURL1" ></input>
  <button type="submit">update product</button>
</form>
</div>

</>  : <> 


<div className="singleProductContainer" > 



<div className="singleDetails" key={product.id}> 
<img src={product.imageURL1} alt="" ></img>
<div className ="texts">
<h4>Product Name: {product.name}</h4>
<h4>Price: {product.price}$</h4>
<h4>InCart : {product.quantity} items</h4>
<h4>Category : {product.category}</h4>
{/* <h4>userID : {product.userId}</h4>
<h4>userId : {userId}</h4> */}


{product.userId===parseInt(userId) ? 
<>
<button onClick={()=>{deleteProduct(product.id)}}> Delete </button>
<button onClick={()=>{setUpdate(true)}} >Update</button>
</>

: <>
<button >Add To Cart <i class="fa fa-cart-plus" aria-hidden="true"></i></button>
</>}
</div>

</div> 



</div>


</>}

{deleted?<>
  <Switch>
          <Redirect from="*" to={`/Dashboard`}></Redirect>
        </Switch>

</>:<></>}
{auth.loginStatus ?<></>: <> <Switch>
    <Redirect from='*' to={`/signin`}></Redirect>
    </Switch></>  }
</>)


}



