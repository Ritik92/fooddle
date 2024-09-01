"use client"
import Loader from "@/components/Loader";
import VendorNavbar from "@/components/VendorNavbar";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditMenu(){
    const [error, setError] = useState<string | null>(null);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/restaurants/1`);
                setCategories(response.data.menu.categories);
            } catch (error: any) {
                console.error('Error fetching data:', error.message); // Log specific error message
                setError('There was an error fetching the data.');
            }
        };

        fetchData();
    }, []);

    if (error) return <p>{error}</p>;
    if (!categories) return <div><Loader/></div>;
    
    const handleAddCategorySubmit = (newCategory) => {
        setCategories([...categories, { ...newCategory, id: Date.now().toString(), items: [] }]);
      };
    return(
        <div className="overflow-auto h-screen"> 
            <VendorNavbar active={'Customer Mode'}/>
            
      <div className="flex justify-between text-blue-700 text-2xl font-bold p-6">
        <div>
            Menu
        </div>
        <div>
            <Button  onClick={() => setIsAddingCategory(true)}>Add Category</Button>
        </div>
    </div>
            <Menu categories={categories} />
           
             <AddCategoryModal
                 isOpen={isAddingCategory}
               onClose={() => setIsAddingCategory(false)}
                  onAdd={handleAddCategorySubmit}
                   />
        </div>
    )
}
const Menu = ({ categories }) => {
    return (
      <div className="container mx-auto p-4 ">
   
        
        {categories.map((category) => (
          <div key={category.id} className="mb-8 mt-8  ">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                  <button
           //   onClick={() => onAddItem(category.id)}
       className="bg-blue-500 text-white px-4 py-2 rounded"
             >
        Add Item
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {category.items.map((item) => (
      <div key={item.id} className="border p-4 rounded">
        <div className="flex justify-between items-center">
          <span>{item.name}</span>
          <span>₹{item.price.toFixed(2)}</span>
        </div>
        {item.customizations.map((customization)=>(
            <div key={customization.id}>
                
                <div className="flex justify-between text-gray-400 text-sm">
                <div>{customization.name}</div>
                <div>₹{customization.price} </div>
                </div>
               
            </div>
        ))}
        <div className="mt-2">
          <button
            // onClick={() => onEditItem(item)}
            className="mr-2 text-blue-500"
          >
            Edit
          </button>
          <button
            // onClick={() => onDeleteItem(item.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>
        ))}
        <div className="h-[10%]">

        </div>
      </div>
    );
  };
  const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAdd({ name });
      setName('');
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block mb-2">Name</label>
              <input
                type="text"
                id="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const AddItemModal = ({ isOpen, onClose, onAdd, categoryId }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAdd(categoryId, { name, price: parseFloat(price) });
      setName('');
      setPrice('');
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  