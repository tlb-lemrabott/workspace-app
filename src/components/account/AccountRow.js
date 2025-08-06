import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AccountRow = ({ account }) => {
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

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{safeCompanyName}</td>
      <td className="px-4 py-2">{safeEmail}</td>
      <td className="px-4 py-2">
        <span>{showUsername ? safeUsername : '••••••••'}</span>
        <button onClick={toggleUsername} className="text-blue-600 hover:text-blue-800">
          {showUsername ? <FaEyeSlash /> : <FaEye />}
        </button>
      </td>
      <td className="px-4 py-2">
        <span>{showPassword ? safePassword : '••••••••'}</span>
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
    </tr>
  );
};

export default AccountRow;