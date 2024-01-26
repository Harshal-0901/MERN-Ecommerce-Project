import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import AdminRoute from "./component/Route/AdminRoute.js";
/* import ProtectedRoute from "./component/Route/ProtectedRoute.js"; */
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        {/* <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} /> */}
        <Route
          exact
          path="/account"
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <AdminRoute>
              <UpdateProfile />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <AdminRoute>
              <UpdatePassword />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/shipping"
          element={
            <AdminRoute>
              <Shipping />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <AdminRoute>
              <ConfirmOrder />
            </AdminRoute>
          }
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <AdminRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </AdminRoute>
            }
          />
        )}
        <Route
          exact
          path="/success"
          element={
            <AdminRoute>
              <OrderSuccess />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <AdminRoute>
              <MyOrders />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <AdminRoute>
              <OrderDetails />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute isAdmin={true}>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <AdminRoute isAdmin={true}>
              <ProductList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <AdminRoute isAdmin={true}>
              <NewProduct user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <AdminRoute isAdmin={true}>
              <UpdateProduct user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <AdminRoute isAdmin={true}>
              <OrderList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <AdminRoute isAdmin={true}>
              <ProcessOrder user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <AdminRoute isAdmin={true}>
              <UsersList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <AdminRoute isAdmin={true}>
              <UpdateUser />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <AdminRoute isAdmin={true}>
              <ProductReviews user={user} />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
