import express from 'express';
import dotenv from 'dotenv'
import connect from './Config/DbConfig.js';
import apirouter from './Routers/ApiRouter.js';
import cors from 'cors'
dotenv.config();


const app = express();
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ limit:'50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



app.use('/api',apirouter);

app.get('/', (req, res) => {
    return res.status(201).json({ message: 'hello' });
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ',process.env.PORT);
    connect();
});
