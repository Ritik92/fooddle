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
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
          activeCategory === null ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`px-4 py-2 min-w-[100px] rounded-full text-sm whitespace-nowrap ${
            activeCategory === category.id ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Filterbar;
