import { useState } from 'react';

const CustomizationPopup = ({ customizations, onClose, onComplete }) => {
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);

  const handleCustomizationToggle = (customization) => {
    setSelectedCustomizations(prev => {
      const exists = prev.find(c => c.id === customization.id);
      if (exists) {
        return prev.filter(c => c.id !== customization.id);
      } else {
        return [...prev, customization];
      }
    });
  };

  const handleComplete = () => {
    onComplete(selectedCustomizations);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Choose Customizations</h2>
        <div className="max-h-60 overflow-y-auto">
          {customizations.map(customization => (
            <div key={customization.id} className="flex items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0">
              <input
                type="checkbox"
                id={customization.id}
                checked={selectedCustomizations.some(c => c.id === customization.id)}
                onChange={() => handleCustomizationToggle(customization)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={customization.id} className="ml-3 flex justify-between items-center w-full">
                <span className="font-medium">{customization.name}</span>
                <span className="text-gray-600">+₹{customization.price.toFixed(2)}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleComplete}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPopup;