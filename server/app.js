import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'
import dotenv from 'dotenv';

const app = express()


// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
dotenv.config();
app.use(express.static('dist'));

// routes
app.use(router);

export default app;