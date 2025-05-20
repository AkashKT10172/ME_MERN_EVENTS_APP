const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const startStatusUpdateCron = require('./utils/updateEventStatusCron');

const app = express();
dotenv.config();
connectDB(); 
const PORT = process.env.PORT;
startStatusUpdateCron();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Events Management Platform is Running!')
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

