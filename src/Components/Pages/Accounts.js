import React, { useState, useEffect } from 'react';
import './Accounts.css';

const Accounts = () => {
  const [accountData, setAccountData] = useState(null);
  const [customerAccounts, setCustomerAccounts] = useState([]);
  const [searchType, setSearchType] = useState('account');
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseBalance = (balance) => {
    // Convert balance to number if it's a string
    const num = typeof balance === 'string' ? parseFloat(balance) : balance;
    // Check if it's a valid number before using toFixed
    return isNaN(num) ? 'N/A' : num.toFixed(2);
  };

  const fetchAccountById = async (accountId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/account/${accountId}`);
      if (!response.ok) {
        throw new Error('Account not found');
      }
      const data = await response.json();
      setAccountData(data);
      setCustomerAccounts([]);
    } catch (err) {
      setError(err.message);
      setAccountData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountsByCustomerId = async (customerId) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/customer/${customerId}/accounts`);
      if (!response.ok) {
        throw new Error('Customer not found or no accounts exist');
      }
      const data = await response.json();
      setCustomerAccounts(data);
      setAccountData(null);
    } catch (err) {
      setError(err.message);
      setCustomerAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) {
      setError('Please enter an ID');
      return;
    }
    if (searchType === 'account') {
      fetchAccountById(searchId);
    } else {
      fetchAccountsByCustomerId(searchId);
    }
  };

  return (
    <div className="accounts-container">
      <h2>Account Management</h2>
      
      <div className="search-section">
        <div className="search-options">
          <label>
            <input
              type="radio"
              name="searchType"
              checked={searchType === 'account'}
              onChange={() => setSearchType('account')}
            />
            Search by Account ID
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              checked={searchType === 'customer'}
              onChange={() => setSearchType('customer')}
            />
            Search by Customer ID
          </label>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={`Enter ${searchType === 'account' ? 'Account' : 'Customer'} ID`}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {accountData && (
        <div className="account-details">
          <h3>Account Details</h3>
          <table>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Type</th>
                <th>Balance</th>
                <th>Customer ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{accountData.Account_id}</td>
                <td>{accountData.Account_type}</td>
                <td>${parseBalance(accountData.Balance)}</td>
                <td>{accountData.Customer_id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {customerAccounts.length > 0 && (
        <div className="customer-accounts">
          <h3>Customer Accounts</h3>
          <table>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Type</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {customerAccounts.map((account) => (
                <tr key={account.Account_id}>
                  <td>{account.Account_id}</td>
                  <td>{account.Account_type}</td>
                  <td>${parseBalance(account.Balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Accounts;