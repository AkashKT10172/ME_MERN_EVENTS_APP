const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const PORT = process.env.PORT;

app.get('/', () => {
    console.log('Events Management Platform')
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

