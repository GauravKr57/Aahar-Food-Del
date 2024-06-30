import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // Access cart items from StoreContext file api

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();        //Used to move to /order page on clicking PROCEED TO PAYMENT

  const deliveryFee = (getTotalCartAmount() === 0) ? 0 : 30;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="xyz">Delicacies</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="cartItem" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>{" "}
                  {/*//Total price*/}
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {deliveryFee}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p className="total-amount">Total</p>
              <p className="show-total-amount">₹ {getTotalCartAmount()+deliveryFee}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>Have a promo Code?</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo-code" />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
