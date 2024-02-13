import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  mongoDB: {
    url: process.env.MONGO_DB_URL,
    dbName: process.env.MONGO_DB_NAME
  },
  userRoles: ['user', 'admin', 'editor'],
  userStatuses: ['new', 'active', 'inactive'],
  mail: {
    email: process.env.MAIL_EMAIL,
    password: process.env.MAIL_PASSWORD,
  },
  JWTSecret: 'secret',
};

export default config;