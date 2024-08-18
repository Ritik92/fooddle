import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/slices/cartSlice';
import { Image } from '@nextui-org/react';
import CustomizationPopup from './customization';
import RemoveItemPopup from './RemoveItemPopup'; // New component we'll create

const Menuitems = (props) => {
  const dispatch = useDispatch();
  const [showCustomizationPopup, setShowCustomizationPopup] = useState(false);
  const [showRemoveItemPopup, setShowRemoveItemPopup] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);

  const { id, name, price, customizations } = props.data;
  
  // Get all items with the same id (regardless of customizations)
  const cartItems = useSelector((state: any) =>
    state.cart.items.filter(item => item.id === id)
  );

  // Sum the quantities of all instances of the item with the same id
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
      customizations
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
    <div className='flex mt-[24px] justify-between'>
      <div className='flex'> 
        <Image src="/foodimage.png" alt="Food Image" width={101.62} height={88.77} />
        <div className='ml-[9.34px]'>
          <Image src="/vegicon.png" alt="Food Image" width={15.18} height={15.71} />
          <div className='mt-[4.27px]'>
            {name}
          </div>
          <div className='text-[#004BAD] text-left'>
            {price} 
          </div>
        </div> 
      </div>
      <div className='flex items-center'>
        {totalQuantity === 0 ? (
          <button 
            className='w-[79.56px] h-[36.04px] bg-[#EAF3FF] rounded-[30.03px] font-urbanist text-[#004BAD] text-base font-semibold' 
            onClick={handleAddToCart}
          >
            Add
          </button>
        ) : (
          <div className='flex items-center justify-between w-[120px] h-[36.04px] bg-[#EAF3FF] rounded-[30.03px] font-urbanist text-[#004BAD] text-base font-semibold'>
            <button 
              className='w-[36.04px] h-[36.04px] rounded-full flex items-center justify-center'
              onClick={handleRemoveItem}
            >
              -
            </button>
            <span>{totalQuantity}</span>
            <button 
              className='w-[36.04px] h-[36.04px] rounded-full flex items-center justify-center'
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