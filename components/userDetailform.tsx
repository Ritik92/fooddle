import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

type DeliveryAddress = {
  id: string;
  name: string;
};

const deliveryAddresses: DeliveryAddress[] = [
  { id: 'hostel-b', name: 'Hostel - B' },
  { id: 'hostel-q', name: 'Hostel - Q' },
  { id: 'hostel-o', name: 'Hostel - O' },
  { id: 'hostel-l', name: 'Hostel - L' },
  { id: 'hostel-c', name: 'Hostel - C' },
  { id: 'hostel-d', name: 'Hostel - D' },
  { id: 'hostel-e', name: 'Hostel - E' },
  { id: 'hostel-g', name: 'Hostel - G' },
  { id: 'hostel-h', name: 'Hostel - H' },
  { id: 'hostel-i', name: 'Hostel - I' },
  { id: 'hostel-j', name: 'Hostel - J' },
  { id: 'hostel-k', name: 'Hostel - K' },
  { id: 'hostel-m', name: 'Hostel - M' },
  { id: 'hostel-n', name: 'Hostel - N' },
  { id: 'library', name: 'Library' },
  { id: 'hostel-a', name: 'Hostel - A' },
  { id: 'fr-g', name: 'FR-G' },
  { id: 'fr-f', name: 'FR-F' },
];

const UserDetailsForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber || !address) {
      toast.error('Please fill in all fields', { duration: 3000 });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = { name, phoneNumber, address };
      await axios.put('/api/signup/userdetailsupdate', data);
      toast.success('Details submitted successfully!', { duration: 3000 });
      setTimeout(() => router.push('/'), 3000);
    } catch (error) {
      toast.error('An error occurred. Please try again.', { duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-2xl rounded-3xl p-8 space-y-8">
          <h2 className="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">
            Complete Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              id="phone-number"
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <SelectField
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              options={deliveryAddresses}
            />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </motion.div>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

const InputField = ({ id, type, placeholder, value, onChange }) => (
  <motion.input
    whileFocus={{ scale: 1.02 }}
    id={id}
    name={id}
    type={type}
    required
    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const SelectField = ({ id, value, onChange, options }) => (
  <motion.select
    whileFocus={{ scale: 1.02 }}
    id={id}
    name={id}
    required
    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
    value={value}
    onChange={onChange}
  >
    <option value="">Select a delivery address</option>
    {options.map((addr) => (
      <option key={addr.id} value={addr.id}>
        {addr.name}
      </option>
    ))}
  </motion.select>
);

const SubmitButton = ({ isSubmitting }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type="submit"
    disabled={isSubmitting}
    className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out disabled:opacity-50"
  >
    {isSubmitting ? (
      <Loader2 className="animate-button-spin mr-2" size={20} />
    ) : null}
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </motion.button>
);

export default UserDetailsForm;