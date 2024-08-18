interface FilterbarProps {
    categories: Array<{ id: string; name: string }>;
    activeCategory: string | null;
    onCategorySelect: (categoryId: string | null) => void;
  }
  
  const Filterbar: React.FC<FilterbarProps> = ({ categories, activeCategory, onCategorySelect }) => {
    return (
        <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-3 py-1 rounded-full ${
            activeCategory === null ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-3 py-1 rounded-full ${
              activeCategory === category.id ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    )
}
export default Filterbar;