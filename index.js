import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
    res.json({message: "Hello world"})
})

app.listen(config.port, ()=>{
   console.log(`app start on port ${config.port}`)
})