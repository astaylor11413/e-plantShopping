import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // current items in the cart saved here
  },
  reducers: {
    addItem: (state, action) => {
        if(action.payload){
            const {name,image, cost} = action.payload;
            const existingItem = state.items.find((element)=>element.name===name);
            if(existingItem){//item already has been added before to the cart
                existingItem.quantity++;
            }else{//item will be added to the cart for the first time
                state.items.push({name,image,cost,quantity:1});
            }
        }
    },
    removeItem: (state, action) => {
        if(action.payload){
            const {name} = action.payload;
            const existingItem = state.items.find((element)=>element.name===name);
            if(existingItem){
                state.items.splice(state.items.indexOf(existingItem),1);
            }
        }
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const updatedItem = state.items.find((item)=>item.name===name);
        if(updatedItem){
            updatedItem.quantity = quantity;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
