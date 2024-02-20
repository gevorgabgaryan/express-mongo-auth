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
  redis: {
    port: process.env.REDIS_PORT || 6379,
    client: null
  },
  mysql: {
    options: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB_NAME,
      dialect: 'mysql',
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD
    },
    client: null
  },
};

export default config;