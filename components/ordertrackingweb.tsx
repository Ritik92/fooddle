"use client";
import React, { useState } from 'react';

const OrderTrackingMobile = (props) => {
    let status=props.status;
    let restaurantName=props.restaurantName
  return (
    <div className="bg-gray-100 p-8 rounded-lg   mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-600 font-bold text-lg"> {restaurantName} </h2>
        <span className="text-gray-500">→</span>
        <h2 className="text-blue-600 font-bold text-lg">Hostel O</h2>
      </div>

      <div className="flex items-center">
        <div
          className={`flex-1 h-1 transition-all duration-300 ease-in-out ${
            status === 'preparing' ? 'bg-blue-600' : 'bg-blue-600'
          }`}
        ></div>
        <div
          className={`flex-1 h-1 transition-all duration-300 ease-in-out ${
            status === 'outForDelivery' || status === 'delivered' ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`flex-1 h-1 transition-all duration-300 ease-in-out ${
            status === 'delivered' ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        ></div>
      </div>

      <div className="flex justify-between mt-2 text-gray-500 text-sm">
        <div
          className={`transition-colors duration-300 ${
            status === 'preparing' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          In Preparation
        </div>
        <div
          className={`transition-colors duration-300 ${
            status === 'outForDelivery' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          Out for Delivery
        </div>
        <div
          className={`transition-colors duration-300 ${
            status === 'delivered' ? 'text-blue-600 font-bold' : ''
          }`}
        >
          Delivered
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingMobile;
