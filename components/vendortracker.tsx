"use client"
import React, { useState, useEffect } from 'react';

const StatusTracker = ({ initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [isCanceled, setIsCanceled] = useState(false);

  const statuses = [
    'Received',
    'Confirmed',
    'Out for Delivery',
    'Delivered',
    
  ];

  useEffect(() => {
    setStatus(initialStatus);
    if(initialStatus=='Canceled')   setIsCanceled(true);
  }, [initialStatus]);

 

  if (isCanceled) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="h-2 mb-4 rounded bg-red-500"></div>
        <div className="text-center text-sm font-semibold text-red-600">Order Canceled</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          {statuses.map((step, index) => (
            <div
              key={step}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                statuses.indexOf(status) >= index ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              style={{ width: `${100 / statuses.length}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          {statuses.map((step, index) => (
            <div
              key={step}
              className={`text-xs font-semibold ${
                statuses.indexOf(status) >= index ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default StatusTracker;