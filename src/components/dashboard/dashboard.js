import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";
import {API} from '../../utilize'
import { Switch, Redirect } from "react-router-dom";
import "./dashboard.css";
export default function Dashboard() {
  const [userId] = useState(cookie.load("id"));
  const [Products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const api = API;
  const addProduct = async (e) => {
    e.preventDefault();
    let productBody = {
      name: e.target.name.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      category: e.target.category.value,
      imageURL1: e.target.imageURL1.value,
    };
    JSON.stringify(productBody);
    console.log("JSON.stringify(productBody): ", JSON.stringify(productBody));
    let data = await axios.post(
      `${api}/addProduct`,
      productBody,

      {
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    );
    console.log("data: ", data);
    fetchProducts();

  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProducts = async () => {
    let data = await axios.get(`${api}/oneProduct/${userId}`, {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    })
if(data.data){

  setProducts(data.data)
}
    

  };

  const deleteProduct = async (id) => {
    await axios.delete(`${api}/oneProduct/${userId}/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    });
  };
  
   
  useEffect(() => {
    fetchProducts();
  }, []);
  const openProduct = (id) => {
    cookie.save("productId", id);
    setOpen(true);
    setId(id);
  };
  return (
    <div>
      {!cookie.load("id") ? (
        <>
          {" "}
          <h1>
            You Are Not Signed In ? <a href="/signin"> sign In from here</a>{" "}
          </h1>
        </>
      ) : (
        <>
          <div className="main-div">
            <h1>Publish Your Product !</h1>
          </div>

            <div className="main-div">
              <form onSubmit={(e) => addProduct(e)}>
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
              
           {Products.map((item, idx) => {
              return (
                  <div className="OneProductClass">
                    <h4>{item.name}</h4>

                    <img
                      src={item.imageURL1}
                      alt={item.name}
                      onClick={() => {
                        openProduct(item.id);
                      }}
                    ></img>
                    <h5>{item.price}$$</h5>
                  
                  </div>

);
})}
</div>
        </>
      )}
      {open ? (
        <Switch>
          <Redirect from="*" to={`/productDetails/${id}`}></Redirect>
        </Switch>
      ) : (
        <></>
      )}
    </div>
  );
}
