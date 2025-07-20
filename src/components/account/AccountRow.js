import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountRow = ({ account }) => {
  const { companyName, email, username, password, resourceLink, creation_date, updated_date } = account;
  const formattedCreationDate = new Date(creation_date).toLocaleString();
  const formattedUpdatedDate = new Date(updated_date).toLocaleString();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{companyName}</td>
      <td className="px-4 py-2">{email}</td>
      <td className="px-4 py-2">{username}</td>
      <td className="px-4 py-2 flex items-center gap-2">
        <span>{showPassword ? password : '••••••••'}</span>
        <button onClick={togglePassword} className="text-blue-600 hover:text-blue-800">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </td>
      <td className="px-4 py-2">
        <a href={resourceLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          resource
        </a>
      </td>
      <td className="px-4 py-2">{formattedCreationDate}</td>
      <td className="px-4 py-2">{formattedUpdatedDate}</td>
    </tr>
  );
};

export default AccountRow;