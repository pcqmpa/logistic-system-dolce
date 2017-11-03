module.exports = {
  env: {
    DEBUG: process.env.NODE_ENV !== 'production',
    MOCK_SERVER: !!process.env.MOCK_SERVER,
    SERVER_PORT: process.env.PORT || 3001,
    API_PORT: 3002,
    DEV_SERVER_PORT: 3003,
    MOCK_API_PORT: 3004,
    HOST: process.env.HOST || 'localhost',
    MONGODB_HOST: process.env.MONGO_URL || 'mongodb://localhost/logistic-sytem-dolce'
  },
  SESSION_SECRET: '1b02ba0103eb88faa6e21373bd79df319c5e0aab4106161de052eac33c13f4a1',
  TOKEN_SECRET: '555491b31ac73c65cabbecf4b8c0867e36356378',
  API_SERVICE_URL: 'http://192.168.1.7:8030',
  MOUNT_ID: 'root',
  cssName: 'style.css',
  appName: 'main'
};
