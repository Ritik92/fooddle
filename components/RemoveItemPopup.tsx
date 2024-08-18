// RemoveItemPopup.tsx
import React from 'react';

const RemoveItemPopup = ({ items, onClose, onRemove }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select item to remove</h2>
        <div className="max-h-60 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-3 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.customizations.map(c => c.name).join(', ')}
                  </p>
                </div>
                <button 
                  onClick={() => onRemove(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItemPopup;