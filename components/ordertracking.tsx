"use client";
import React from 'react';
import { MdCheckCircle, MdDeliveryDining, MdRestaurant } from 'react-icons/md'; 
import { FiArrowRight } from 'react-icons/fi';

const OrderTracking = ({ orderStatus }) => {

  const getStatusClasses = (currentStatus) => {
    if (orderStatus === currentStatus) return 'bg-blue-600 text-white';
    if (orderStatus === 'outForDelivery' && currentStatus === 'preparing') return 'bg-blue-600 text-white';
    if (orderStatus === 'delivered' && (currentStatus === 'preparing' || currentStatus === 'outForDelivery')) return 'bg-blue-600 text-white';
    return 'bg-gray-300 text-gray-500';
  };

  return (
    <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-lg md:pl-[15%] md:pr-[15%]  mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-blue-600 font-bold text-xl"> Pizza Nation </h2>
        <FiArrowRight className="text-gray-500 text-2xl" />
        <h2 className="text-blue-600 font-bold text-xl">Hostel O</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className={`flex-1 flex items-center justify-center h-12 rounded-full ${getStatusClasses('preparing')}`}>
          <MdRestaurant className="text-2xl" />
        </div>
        <div className={`flex-1 h-1 mx-2 transition-all duration-300 ease-in-out ${orderStatus !== 'preparing' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`flex-1 flex items-center justify-center h-12 rounded-full ${getStatusClasses('outForDelivery')}`}>
          <MdDeliveryDining className="text-2xl" />
        </div>
        <div className={`flex-1 h-1 mx-2 transition-all duration-300 ease-in-out ${orderStatus === 'delivered' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`flex-1 flex items-center justify-center h-12 rounded-full ${getStatusClasses('delivered')}`}>
          <MdCheckCircle className="text-2xl" />
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <button className={`transition-colors duration-300 ${orderStatus === 'preparing' ? 'text-blue-600 font-semibold' : ''}`}>
          In Preparation
        </button>
        <button className={`transition-colors duration-300 ${orderStatus === 'outForDelivery' ? 'text-blue-600 font-semibold' : ''}`}>
          Out for Delivery
        </button>
        <button className={`transition-colors duration-300 ${orderStatus === 'delivered' ? 'text-blue-600 font-semibold' : ''}`}>
          Delivered
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
