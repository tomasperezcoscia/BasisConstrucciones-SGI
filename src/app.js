import express from 'express'
import morgan from 'morgan'
import router from './routes/index.js'

const app = express()


// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.use(router);

export default app;