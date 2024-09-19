import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';
import { Image } from '@nextui-org/react';
import CustomizationPopup from './customization';
import RemoveItemPopup from './RemoveItemPopup';

const Menuitems = (props) => {
  const dispatch = useDispatch();
  const [showCustomizationPopup, setShowCustomizationPopup] = useState(false);
  const [showRemoveItemPopup, setShowRemoveItemPopup] = useState(false);

  const { id, name, price, customizations, restaurantId } = props.data;
  
  const cartItems = useSelector((state: any) =>
    state.cart.items.filter(item => item.id === id)
  );

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = () => {
    if (customizations && customizations.length > 0) {
      setShowCustomizationPopup(true);
    } else {
      addItemToCart([]);
    }
  };

  const addItemToCart = (customizations = []) => {
    dispatch(cartActions.addItemToCart({
      id,
      name,
      price,
      customizations,
      restaurantId
    }));
  };
  
  const handleCustomizationComplete = (selectedCustomizations) => {
    setShowCustomizationPopup(false);
    addItemToCart(selectedCustomizations);
  };

  const handleRemoveItem = () => {
    if (cartItems.length > 1) {
      setShowRemoveItemPopup(true);
    } else {
      dispatch(cartActions.removeItemFromCart({ id, customizations: cartItems[0].customizations }));
    }
  };

  const handleRemoveSpecificItem = (itemToRemove) => {
    dispatch(cartActions.removeItemFromCart({ id: itemToRemove.id, customizations: itemToRemove.customizations }));
    setShowRemoveItemPopup(false);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-start">
        {/* <Image
          src="/vegicon.png"
          alt="Veg Icon"
          width={16}
          height={16}
          className="mr-2 mt-1"
        /> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-blue-600 font-medium">₹{price}</p>
        </div>
      </div>
      <div>
        {totalQuantity === 0 ? (
          <button 
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm"
            onClick={handleAddToCart}
          >
            Add
          </button>
        ) : (
          <div className="flex items-center bg-blue-100 rounded-full">
            <button 
              className="w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold"
              onClick={handleRemoveItem}
            >
              -
            </button>
            <span className="mx-3 text-blue-600 font-semibold">{totalQuantity}</span>
            <button 
              className="w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        )}
      </div>
      {showCustomizationPopup && (
        <CustomizationPopup
          customizations={customizations}
          onClose={() => setShowCustomizationPopup(false)}
          onComplete={handleCustomizationComplete}
        />
      )}
      {showRemoveItemPopup && (
        <RemoveItemPopup
          items={cartItems}
          onClose={() => setShowRemoveItemPopup(false)}
          onRemove={handleRemoveSpecificItem}
        />
      )}
    </div>
  );
};

export default Menuitems;