import React from 'react';
import AccountRow from './AccountRow';
import Spinner from '../common/Spinner';

const AccountTable = ({ accounts, loading, totalAccounts, onLoadMore, noData, onEdit, onDelete }) => {
  const shouldShowButton = accounts.length > 0 && accounts.length < totalAccounts;

  return (
    <div>
      <table className="w-full border border-gray-300 mt-6 text-left">
        <thead className="bg-gray-100">
          <tr className="bg-lightblue text-sm">
            <th colSpan="4" className="px-2 py-1 font-medium">Search Result</th>
            <th colSpan="4" className="px-2 py-1 text-right text-sm text-gray-500">
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
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <AccountRow 
              key={account.accountId} 
              account={account} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
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
            onClick={onLoadMore}
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
