
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env if it exists
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('🔧 Environment variables loaded from:', envPath);
  console.log('🔑 OpenRouter API Key status:', process.env.OPENROUTER_API_KEY ? 'Found' : 'Missing');
} else {
  console.warn('⚠️ .env file not found at:', envPath);
}

const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];

/**
 * Validates required Firebase environment variables
 */
const validateFirebaseEnv = () => {
  const missing = requiredVars.filter(varName => !process.env[varName]?.trim());
  return missing.length > 0 ? missing : null;
};

/**
 * Processes multi-line private key properly
 */
const formatPrivateKey = (key) => key.replace(/\\n/g, '\n').trim();

/**
 * Firebase configuration provider
 */
const getFirebaseConfig = () => {
  const missingVars = validateFirebaseEnv();

  if (missingVars) {
    console.warn('⚠️  Missing Firebase environment variables:', missingVars.join(', '));
    console.warn('💡 Firebase is running in demo mode. Set the correct values in your .env file.');

    return {
      projectId: 'demo-project',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMOCK_KEY_FOR_DEVELOPMENT\n-----END PRIVATE KEY-----\n',
      clientEmail: 'demo@demo-project.iam.gserviceaccount.com',
      isDemoMode: true
    };
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID.trim(),
    privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL.trim(),
    isDemoMode: false
  };
};

/**
 * Validates OpenRouter API Key
 */
const validateOpenRouterKey = () => {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key || key.trim() === '') {
    console.error('❌ OPENROUTER_API_KEY is missing or empty');
    return false;
  }
  console.log('✅ OpenRouter API Key validated');
  return true;
};

module.exports = {
  getFirebaseConfig,
  validateOpenRouterKey,
  isDevelopment: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000
};
