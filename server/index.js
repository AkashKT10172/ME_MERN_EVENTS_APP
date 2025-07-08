const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes')
const startStatusUpdateCron = require('./utils/updateEventStatusCron');
const emailReminderCronJob = require('./utils/eventReminderCronJob');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const roleBasedRateLimiter = require('./middleware/roleBasedRateLimiter');
const ipBasedRateLimiter = require('./middleware/ipBasedRateLimiter');
const publicEvents = require('./routes/publicEvents');
const {protect} = require('./middleware/authMiddleware');

const app = express();
dotenv.config();
connectDB(); 

startStatusUpdateCron();
emailReminderCronJob();

app.use(cors());
app.use(express.json());

app.use('/api/auth', ipBasedRateLimiter, authRoutes);
app.use('/api/publicEvents', ipBasedRateLimiter, publicEvents);

app.use(protect);  
app.use(roleBasedRateLimiter); // role based rate limiter for protected routes

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registration', registrationRoutes);

app.get('/', (req, res) => {
    res.send('Events Management Platform is Running!')
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

