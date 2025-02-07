import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {removeItem, updateQuantity} from './CartSlice'
import './CartItem.css';

const CartItem = ({onContinueShopping}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
    

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    //Each cart item object is defined as {name,image,cost,quantity}
    let totalPrice;
    if(cart.length>0){
        cart.forEach((item)=>{
            totalPrice+=item.cost*item.quantity;
        })    
    }else{
        totalPrice=0;
    }
    return totalPrice;
  };
  const totalAmount = calculateTotalAmount();

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    if(item){
        item.quantity++;         
        dispatch(updateQuantity(item));        
    }else{
        console.log("item not present");
    }    
  };

  const handleDecrement = (item) => {
    if(item){                
        if(item.quantity==1){
            dispatch(removeItem(item));
        }else{
            item.quantity--;
            dispatch(updateQuantity(item));
        }
    }else{
        console.log("item not present");
    }
  };

  const handleRemove = (item) => {
    if(item){
        dispatch(removeItem(item));
    }else{
        console.log("item not present");
    }
  };  

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal Price: ${item.quantity*item.cost}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>Total Price: ${totalAmount}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e)=> handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


