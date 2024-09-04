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
    const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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
    }, [categories]);

    if (error) return <p>{error}</p>;
    if (!categories) return <div><Loader/></div>;
    
    const handleAddCategorySubmit = async (newCategory) => {
      try {
        setError(null);
    
        // Making the PUT request with axios
        const response = await axios.put('/api/menu/categories?userId=user-1', { category: newCategory });
    
        // Check if the response contains the correct data structure
        if (response.status === 200) {
          setCategories([...categories, response.data]); // Assuming response.data.categories contains the new category
        } else {
          setError('Failed to add category. Please try again.');
        }
    
      } catch (err) {
        setError('Failed to add category. Please try again.');
        console.error('Error adding category:', err);
      }
    };
    const handleAddItem = (categoryId) => {
      setSelectedCategory(categoryId);
      setIsAddingItem(true);
    };
  
  
  
    const handleAddItemSubmit = async (categoryId, newItem) => {
      try {
        setError(null);
        console.log("New Item is",newItem)
        const response = await axios.post(`/api/menu/additem?userId=user-1`, {newItem,categoryId});
        setCategories(categories.map(category => 
          category.id === categoryId
            ? { ...category, items: [...category.items, response.data] }
            : category
        ));
      } catch (err) {
        setError('Failed to add item. Please try again.');
        console.error('Error adding item:', err);
      }
    };
    const handleEditItem = (item, categoryId) => {
      setSelectedItem(item);
      setSelectedCategory(categoryId);
      setIsEditingItem(true);
    };
    const handleEditItemSubmit = async (editedItem) => {
      try {
        setError(null);
        console.log(editedItem)
        const response = await axios.put(`/api/menu/edititem?userId=user-1`, editedItem);
        setCategories(categories.map(category => 
          category.id === selectedCategory
            ? { ...category, items: category.items.map(item => item.id === editedItem.id ? response.data : item) }
            : category
        ));
      } catch (err) {
        setError('Failed to edit item. Please try again.');
        console.error('Error editing item:', err);
      }
    };
    const handleDeleteItem = async (itemId, categoryId) => {
      console.log(itemId);
    
      if (window.confirm('Are you sure you want to delete this item?')) {
        try {
          setError(null);
    
          // Sending a DELETE request with the itemId in the request body
          await axios.delete('/api/menu/edititem?userId=user-1', {
            data: { itemId }  // Sending the itemId in the data property
          });
    
          // Update the state after deletion
          setCategories(categories.map(category => 
            category.id === categoryId
              ? { ...category, items: category.items.filter(item => item.id !== itemId) }
              : category
          ));
        } catch (err) {
          setError('Failed to delete item. Please try again.');
          console.error('Error deleting item:', err);
        }
      }
    };
    
    return(
        <div className="overflow-auto h-screen bg-[#F5F5F5]"> 
            <VendorNavbar active={'Customer Mode'}/>
            
      <div className="flex justify-between text-blue-700 text-2xl font-bold p-6">
        <div>
            Menu
        </div>
        <div>
            <Button  onClick={() => setIsAddingCategory(true)}>Add Category</Button>
        </div>
    </div>
    {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          onAddItem={handleAddItem}
          onEditItem={(item) => handleEditItem(item, category.id)}
          onDeleteItem={(itemId) => handleDeleteItem(itemId, category.id)}
        />
      ))}
            <AddItemModal
        isOpen={isAddingItem}
        onClose={() => setIsAddingItem(false)}
        onAdd={handleAddItemSubmit}
        categoryId={selectedCategory}
      />
        <EditItemModal
        isOpen={isEditingItem}
        onClose={() => setIsEditingItem(false)}
        onEdit={handleEditItemSubmit}
        item={selectedItem}
      />


             <AddCategoryModal
                 isOpen={isAddingCategory}
                  onClose={() => setIsAddingCategory(false)}
                  onAdd={handleAddCategorySubmit}
                   />
        </div>
    )
}
const Category = ({ category, onAddItem, onEditItem , onDeleteItem }) => {
  return (
    <div className="mb-6 p-6 ">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <button
          onClick={() => onAddItem(category.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Item
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {category.items?.map((item) => (
          <div key={item.id} className="border p-4 rounded bg-white">
            <div className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>₹{item.price?.toFixed(2)}</span>
            </div>
            <button
              onClick={() => onEditItem(item)}
              className="mt-2 text-blue-500 "
            >
              Edit
            </button>
            <button
                onClick={() => onDeleteItem(item.id)}
                className="text-red-500 ml-2"
              >
                Delete
              </button>
          </div>
        ))}
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
  const EditItemModal = ({ isOpen, onClose, onEdit, item }) => {
    const [name, setName] = useState(item?.name || '');
    const [price, setPrice] = useState(item?.price?.toString() || '');
  
    useEffect(() => {
      if (item) {
        setName(item.name);
        setPrice(item.price.toString());
      }
    }, [item]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onEdit({ ...item, name, price: parseFloat(price) });
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="editName" className="block mb-2">Name</label>
              <input
                type="text"
                id="editName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editPrice" className="block mb-2">Price</label>
              <input
                type="number"
                id="editPrice"
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
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  