import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        let i=0;
        state.items.forEach((item)=>{
            if(item.name===action.payload.name){
                i = state.items.findIndex(item);
            }
        });
        if(i!=0){
            state.items[i].quantity++;
        }else{
            state.items.push({
                image: action.payload.image,
                name: action.payload.name,
                cost: action.payload.cost,
                quantity: 1,
            });
        }
        
    },
    removeItem: (state, action) => {
        
        state.items = state.items.filter((item)=>{
            item.name!==action.payload.name;
        })
        
    },
    updateQuantity: (state, action) => {
        /*
        const {name, quantity} = action.payload;
        const foundItem = state.items.find((item)=>item.name===name);
        if(foundItem){
            foundItem.quantity = quantity;
        }
        */
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
