import React,{useState ,useEffect} from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios'
import './products.css';
const api ='https://shop-backend-com.herokuapp.com'


export default function SingleProduct(){

const param =useParams()
const [id ]=useState(parseInt(param.id))
const [product ,setProduct]=useState([])

const fetchProduct =async ()=>{


    let data =await axios.get(`${api}/products/${id}`)
    if(data){
        setProduct(data.data)
        console.log(data.data);
    }
}

useEffect(()=>{
    fetchProduct()
},[])




return(<>

<div className="singleProductContainer" > 



<div className="singleDetails" key={product.id}> 
<img src={product.imageURL1} alt="" ></img>
<div className ="texts">
<h4>Product Name: {product.name}</h4>
<h4>Price: {product.price}$</h4>
<h4>InCart : {product.quantity} items</h4>
<h4>Category : {product.category}</h4>
<button >Add To Cart <i class="fa fa-cart-plus" aria-hidden="true"></i></button>

</div>

</div> 



</div>

</>)


}
