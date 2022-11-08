import React,{useState ,useEffect} from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios'
import './products.css';

import {API} from '../../utilize'
const api =API

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
    

    <div className="userProducts">
    {productData.map((val, index) => {
          const { name, category, price, quantity,  id, imageURL2 ,imageURL1 } = val
          return (
            <div className="OneProductClass" key={index}>
                <Link to={`/productDetails/${id}`}>
                <img src={imageURL1} alt='' />
                      
                </Link>

                    <h4>{name}</h4>
                
                    <h5 className="btn2">{price}$$</h5>
                
                  
                 
            
               


    </div>
)
})}


</div>
    
    </>)
}
