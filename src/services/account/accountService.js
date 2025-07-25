const ACCOUNTS_API = process.env.REACT_APP_ACCOUNTS_API;
const ACCOUNTS_API_AUTH_KEY = process.env.REACT_APP_ACCOUNTS_API_AUTH_KEY;

export const fetchAccounts = async (startAfterId = '', pageSize = 10) => {
  try {
    const queryParams = new URLSearchParams();
    if (startAfterId) queryParams.append('startAfterId', startAfterId);
    queryParams.append('pageSize', pageSize);

    const response = await fetch(`${ACCOUNTS_API}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ACCOUNTS_API_AUTH_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch accounts: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Empty response body.');
      }
      return { accounts: [] };
    }

    const data = JSON.parse(text);
    if (!data || !Array.isArray(data.accounts)) {
      console.warn('Invalid response format:', data);
      return { accounts: [] };
    }

    return data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return { accounts: [] };
  }
};




export const createAccount = async (accountData) => {
    try {
      const response = await fetch(ACCOUNTS_API, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': ACCOUNTS_API_AUTH_KEY,
         },
        body: JSON.stringify(accountData),
      });
      if (!response.ok) throw new Error('Failed to create account');
      return await response.json();
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
};