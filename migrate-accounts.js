// Simple script to trigger account migration for search functionality
const API_BASE_URL = 'https://v63r1lm7t1.execute-api.us-east-1.amazonaws.com/dev/api/accounts';
const AUTH_KEY = process.env.REACT_APP_ACCOUNTS_API_AUTH_KEY || 'Lem@19#96';

async function migrateAccounts() {
  try {
    console.log('Starting account migration for search functionality...');
    
    const response = await fetch(`${API_BASE_URL}/migrate-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_KEY,
      },
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Migration successful:', result.message);
    } else {
      console.error('❌ Migration failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Error during migration:', error.message);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateAccounts();
}

module.exports = { migrateAccounts }; 