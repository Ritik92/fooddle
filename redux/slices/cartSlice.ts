// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => 
        item.id === newItem.id && 
        JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
      );
      
      // Calculate item price including customizations
      const itemPrice = newItem.price + (newItem.customizations?.reduce((total, cust) => total + cust.price, 0) || 0);
      
      state.totalQuantity++;
      state.totalAmount += itemPrice;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          restaurantId: newItem.restaurantId, // Added restaurantId
          quantity: 1,
          totalPrice: itemPrice,
          customizations: newItem.customizations || []
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += itemPrice;
      }
      console.log("Item Added");
    },
    
    removeItemFromCart(state, action) {
      const { id, customizations } = action.payload;
      const existingItemIndex = state.items.findIndex(item => 
        item.id === id && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
      );
      
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalQuantity--;
        state.totalAmount -= existingItem.price + (existingItem.customizations?.reduce((total, cust) => total + cust.price, 0) || 0);
        
        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price + (existingItem.customizations?.reduce((total, cust) => total + cust.price, 0) || 0);
        }
      }
    },
  },
});


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
