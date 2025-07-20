import React, { useEffect, useState } from 'react';
import AccountRow from './AccountRow';
import { fetchAccounts } from '../../services/account/accountService';
import Spinner from '../common/Spinner';

const PAGE_SIZE = 10;

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [lastAccountId, setLastAccountId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [initialFetchDone, setInitialFetchDone] = useState(false);


  const loadMoreAccounts = async () => {
    try {
      setLoading(true);
      const data = await fetchAccounts(lastAccountId, PAGE_SIZE);
      if (data && Array.isArray(data.accounts)) {
        setAccounts((prev) => [...prev, ...data.accounts]);

        if (data.accounts.length > 0) {
          setLastAccountId(data.accounts[data.accounts.length - 1].accountId);
        }
      } else {
        console.warn("Unexpected response format in pagination:", data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Pagination loading error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialAccounts = async () => {
      try {
        const data = await fetchAccounts();
        if (data && Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
          setTotalAccounts(data.totalAccounts || 0);
          if (data.accounts.length > 0) {
            setLastAccountId(data.accounts[data.accounts.length - 1].accountId);
          }
        } else {
          console.warn("Unexpected response format in useEffect:", data);
        }
      } catch (err) {
        console.error("Initial account loading error:", err);
      } finally {
        setInitialFetchDone(true);
      }
    };
    loadInitialAccounts();
  }, []);
  
  const shouldShowButton = accounts.length > 0 && accounts.length < totalAccounts;
  const noData = initialFetchDone && accounts.length === 0;

  return (
    <div>
      <table className="w-full border border-gray-300 mt-6 text-left">
        <thead className="bg-gray-100">
          <tr className="bg-lightblue text-sm">
            <th colSpan="4" className="px-2 py-1 font-medium">Search Result</th>
            <th colSpan="3" className="px-2 py-1 text-right text-sm text-gray-500">
              Showing {accounts.length} of {totalAccounts || 0}
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2">Account Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Resource</th>
            <th className="px-4 py-2">Creation Date</th>
            <th className="px-4 py-2">Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <AccountRow key={account.accountId} account={account} />
          ))}
        </tbody>
      </table>

      {loading && <Spinner />}

{noData && (
  <div className="text-center text-gray-600 mt-4">No data found</div>
)}

{!loading && shouldShowButton && (
  <div className="flex justify-center mt-4">
    <button
      onClick={loadMoreAccounts}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
    >
      Show more
    </button>
  </div>
)}

    </div>
  );
};

export default AccountTable;
