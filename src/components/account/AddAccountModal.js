import React, { useState } from 'react';
import Spinner from '../common/Spinner';

const AddAccountModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    username: '',
    password: '',
    resourceLink: '',
  });

  const [passwordOption, setPasswordOption] = useState('insert');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordOptionChange = (e) => {
    const value = e.target.value;
    setPasswordOption(value);
    if (value === 'generate') {
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to create account', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add New Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['companyName', 'email', 'username', 'resourceLink'].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
          ))}
          <div>
            <label className="block font-medium">Password</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="passwordOption"
                  value="insert"
                  checked={passwordOption === 'insert'}
                  onChange={handlePasswordOptionChange}
                  className="mr-2"
                />
                Insert
              </label>
              <label>
                <input
                  type="radio"
                  name="passwordOption"
                  value="generate"
                  checked={passwordOption === 'generate'}
                  onChange={handlePasswordOptionChange}
                  className="mr-2"
                />
                Generate
              </label>
            </div>
            {passwordOption === 'insert' && (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded mt-2"
                required
              />
            )}
          </div>

          <div className="text-right">
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;