require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');
const path = require('path');
const User = require('./models/userModel');
const Task = require('./models/taskModel');

const router = require('./router/index.js');

const CLIENT_URL = process.env.NODE_ENV === "production" ? process.env.PROD_CLIENT_URL : process.env.DEV_CLIENT_URL

const DB_URL = process.env.NODE_ENV === "production" ? process.env.PROD_DB_URL : process.env.DEV_DB_URL

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'Super Secret rushools',
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
}

const app = express();

app.use(session(sessionConfig));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware); // middleware ошибок всегда последний app.use

const start = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        app.listen(process.env.PORT || 7000, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log('Something went wrong. Please try again', error.message);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send('root route')
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

start();
