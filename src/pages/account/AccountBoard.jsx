import React, { useEffect, useState, useCallback } from 'react';
import { searchAccounts, createAccount, updateAccount, deleteAccount } from '../../services/account/accountService.js';
import AccountTable from '../../components/account/AccountTable';
import Spinner from '../../components/common/Spinner';
import { FaPlus, FaSearch } from 'react-icons/fa';
import AddAccountModal from '../../components/account/AddAccountModal';
import EditAccountModal from '../../components/account/EditAccountModal';
import { toast } from 'react-toastify';

const PAGE_SIZE = 10;

const AccountBoard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [search, setSearch] = useState('');
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [lastAccountId, setLastAccountId] = useState(null);
  const [noData, setNoData] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          handleSearch({ q: searchTerm });
        }, 300); // 300ms delay
      };
    })(),
    []
  );

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

  // Real-time search effect
  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleSearch = async (opts = {}) => {
    setLoading(true);
    setNoData(false);
    try {
      const params = {
        q: opts.q !== undefined ? opts.q : search,
        pageSize: PAGE_SIZE,
        ...opts
      };
      const data = await searchAccounts(params);
      console.log('Search response data:', data);
      console.log('Accounts array:', data.accounts);
      if (data.accounts && data.accounts.length > 0) {
        console.log('First account object:', data.accounts[0]);
        console.log('First account keys:', Object.keys(data.accounts[0]));
      }
      setAccounts(data.accounts || []);
      setLastAccountId(data.accounts && data.accounts.length > 0 ? data.accounts[data.accounts.length - 1].accountId : null);
      setNoData(!data.accounts || data.accounts.length === 0);
      setTotalAccounts(data.totalAccounts || 0);
    } catch (error) {
      setAccounts([]);
      setNoData(true);
      setTotalAccounts(0);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const params = {
        q: search,
        pageSize: PAGE_SIZE,
        startAfterId: lastAccountId
      };
      const data = await searchAccounts(params);
      setAccounts((prev) => [...prev, ...(data.accounts || [])]);
      setLastAccountId(data.accounts && data.accounts.length > 0 ? data.accounts[data.accounts.length - 1].accountId : lastAccountId);
      setNoData(accounts.length + (data.accounts ? data.accounts.length : 0) === 0);
      setTotalAccounts(data.totalAccounts || 0);
    } catch (error) {
      setNoData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (formData) => {
    try {
      await createAccount(formData);
      toast.success('✅ Account created successfully!');
      setShowAddModal(false);
      handleSearch();
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('❌ Failed to create account.');
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowEditModal(true);
  };

  const handleUpdateAccount = async (formData) => {
    try {
      await updateAccount(editingAccount.accountId, formData);
      toast.success('✅ Account updated successfully!');
      setShowEditModal(false);
      setEditingAccount(null);
      handleSearch();
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('❌ Failed to update account.');
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(accountId);
      toast.success('✅ Account deleted successfully!');
      handleSearch();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('❌ Failed to delete account.');
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAccount(null);
  };

  return (
    <div className="mt-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Account Name (Company)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-2 rounded w-56 pr-8"
              aria-label="Search accounts by company name"
            />
            {loading && (
              <div className="absolute right-2 top-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <FaSearch />
            Search is automatic • Sorted by newest first
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <FaPlus className="text-white" />
          Add Account
        </button>
      </div>

      <p className="text-lg text-gray-700 mb-6 text-left">Manage all your accounts here.</p>

      <AccountTable
        accounts={accounts}
        loading={loading}
        totalAccounts={totalAccounts}
        onLoadMore={handleLoadMore}
        noData={noData}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
      />

      {showAddModal && (
        <AddAccountModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddAccount}
        />
      )}

      {showEditModal && editingAccount && (
        <EditAccountModal
          account={editingAccount}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateAccount}
        />
      )}
    </div>
  );
};

export default AccountBoard;