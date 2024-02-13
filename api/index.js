import express from 'express';
import config from '../config';
import apiRoutes from './routes/apiRoutes';
import cors from 'cors';

class API {
  static async init() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api', apiRoutes);

    const port = config.port;
    app.listen(port, () => {
      console.log(`Rest server started on port: ${port}`);
    });
  }
}

export default API;