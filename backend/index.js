import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

dotenv.config();
const PORT = 5555;
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN STACK');
});

//handling the cros policy
app.use(cors());

//allow custom orgins
// app.use(
//     cors({
//         origin: 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.use('/books', bookRoutes);

mongoose
    .connect(process.env.mongoURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
