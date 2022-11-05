import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/header";
import SignUp from "../components/signup/signup";
import SignIn from "../components/signin/signin";
import Products from "../components/products/products";
import SingleProduct from "../components/products/singleProduct";
import Dashboard from "../components/dashboard/dashboard"
export default function Pages() {
  return (
    <>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/productDetails" component={Products} />
          <Route exact path="/productDetails" component={Products} />
          <Route exact path="/productDetails/:id" component={SingleProduct} />
          
          <Route exact path="/Dashboard" component={Dashboard} />



          productDetails
        </Switch>
      </Router>
    </>
  );
}
