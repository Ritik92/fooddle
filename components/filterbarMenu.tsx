import React from 'react';

interface FilterbarProps {
  categories: Array<{ id: string; name: string }>;
  activeCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const Filterbar: React.FC<FilterbarProps> = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
      <button
        onClick={() => onCategorySelect(null)}
        className={`px-3 py-2 rounded-full text-sm flex-shrink-0 ${
          activeCategory === null ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-3 py-2 rounded-full text-sm flex-shrink-0 ${
            activeCategory === category.id ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          <span className="block max-w-[150px] truncate">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Filterbar;