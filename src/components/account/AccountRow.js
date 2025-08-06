import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';

const AccountRow = ({ account, onEdit, onDelete }) => {
  console.log('AccountRow received account:', account);
  const { companyName, email, username, password, resourceLink, creation_date, updated_date } = account;
  console.log('Destructured values:', { companyName, email, username, password, resourceLink, creation_date, updated_date });
  
  // Add null checks and default values
  const safeCompanyName = companyName || '';
  const safeEmail = email || '';
  const safeUsername = username || '';
  const safePassword = password || '';
  const safeResourceLink = resourceLink || '';
  const safeCreationDate = creation_date || new Date();
  const safeUpdatedDate = updated_date || new Date();
  
  const formattedCreationDate = new Date(safeCreationDate).toLocaleString();
  const formattedUpdatedDate = new Date(safeUpdatedDate).toLocaleString();
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleUsername = () => setShowUsername((prev) => !prev);

  // Handle password display
  const getPasswordDisplay = () => {
    if (showPassword) {
      return safePassword || 'No password set';
    }
    return safePassword ? '••••••••' : 'No password';
  };

  // Handle username display
  const getUsernameDisplay = () => {
    if (showUsername) {
      return safeUsername || 'No username set';
    }
    return safeUsername ? '••••••••' : 'No username';
  };

  const handleEdit = () => {
    onEdit(account);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the account "${safeCompanyName}"?`)) {
      onDelete(account.accountId);
    }
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{safeCompanyName}</td>
      <td className="px-4 py-2">{safeEmail}</td>
      <td className="px-4 py-2 flex items-center gap-2">
        <span>{getUsernameDisplay()}</span>
        <button onClick={toggleUsername} className="text-blue-600 hover:text-blue-800">
          {showUsername ? <FaEyeSlash /> : <FaEye />}
        </button>
      </td>
      <td className="px-4 py-2 flex items-center gap-2">
        <span>{getPasswordDisplay()}</span>
        <button onClick={togglePassword} className="text-blue-600 hover:text-blue-800">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </td>
      <td className="px-4 py-2">
        <a href={safeResourceLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          resource
        </a>
      </td>
      <td className="px-4 py-2">{formattedCreationDate}</td>
      <td className="px-4 py-2">{formattedUpdatedDate}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Edit account"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete account"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AccountRow;