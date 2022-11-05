import React,{useState ,useEffect} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import './products.css';
import cookie from 'react-cookies'

const api ='https://shop-backend-com.herokuapp.com'

export default function Products(){

const [productData ,setProducts]=useState([])

    const fetchProducts =async ()=>{

        let products = await axios.get(`${api}/products`)

        if(products){
            setProducts(products.data)
        }

    }
useEffect(()=>{
    fetchProducts()
},[])


    return (<>
    

    <div className="container">
    {productData.map((val, index) => {
          const { name, category, price, quantity,  id, imageURL2 ,imageURL1 } = val
          return (
            <div className="box shadow" id="boxSh" key={index}>
                <Link to={`/productDetails/${id}`}>
                <div className="postImg" >

                  <img src={imageURL1} alt='' />
                
                </div>
                </Link>

                <div className="text">
                  <div className="category flex">
                    
                  </div>
                    <h4>{name}</h4>
                  <div>
                    <h4 className="btn2">{price} $</h4>{" "}
                  </div>
                  
                  {/* <p>
                  inCart : {quantity}
                  </p> */}
                </div>
                <div className="button flex">
                  
                  {/* <span>post id = {id} </span> */}
                </div>
              </div>


)
})}


    </div>
    
    
    </>)
}
