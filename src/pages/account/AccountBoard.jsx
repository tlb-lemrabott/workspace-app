import React, { useEffect, useState } from 'react';
import { fetchAccounts, createAccount } from '../../services/account/accountService.js';
import AccountTable from '../../components/account/AccountTable';
import Spinner from '../../components/common/Spinner';
import { FaPlus } from 'react-icons/fa';
import AddAccountModal from '../../components/account/AddAccountModal';
import { toast } from 'react-toastify';

const AccountBoard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const data = await fetchAccounts();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (formData) => {
    try {
      await createAccount(formData);
      toast.success('✅ Account created successfully!');
      setShowModal(false);
      loadAccounts();
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('❌ Failed to create account.');
    }
  };

  return (
    <div className="mt-10 px-4">    
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <FaPlus className="text-white" />
          Add Account
        </button>
      </div>

      <p className="text-lg text-gray-700 mb-6 text-left">Manage all your accounts here.</p>

      {loading ? <Spinner /> : <AccountTable accounts={accounts} />}

      {showModal && (
        <AddAccountModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddAccount}
        />
      )}
    </div>
  );
};

export default AccountBoard;