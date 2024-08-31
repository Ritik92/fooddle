import React, { useState } from 'react';

const ShopDetailsForm = ({userId ,data}) => {
  const [isOpen, setIsOpen] = useState(false);
 console.log(userId)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const Updateddata = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    setIsOpen(false);
  };

  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  const TimeInput = ({ label, timeName, periodName }) => (
    <div className="flex-1 mb-4">
      <label htmlFor={timeName} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex">
        <input
          id={timeName}
          name={timeName}
          type="time"
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          name={periodName}
          className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
      >
        Edit Shop Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Shop Details</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <InputField label="Name" name="name" placeholder="Enter the Name" />
           
              <InputField label="Contact number" name="contactNumber" type="tel" placeholder="Enter the Contact Number" />
              <InputField label="Delivery Charge" name="deliveryCharge" type="number" placeholder="Enter the Delivery Charge" />
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <TimeInput label="Opening Time" timeName="openingTime" periodName="openingPeriod" />
                <TimeInput label="Closing Time" timeName="closingTime" periodName="closingPeriod" />
              </div>
              <div className="flex justify-between mb-4">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" name="openAutomatically" className="form-checkbox h-4 w-4 text-blue-600" />
                  <span>Open Automatically</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" name="closeAutomatically" className="form-checkbox h-4 w-4 text-blue-600" />
                  <span>Close Automatically</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopDetailsForm;