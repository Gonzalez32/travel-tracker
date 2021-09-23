const express = require('express');
const morgan = require('morgan'); // shows the format and helps debug.
const helmet = require('helmet'); // block headers.
const cors = require('cors');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'https//localhost:3000',
}));

// simple middleware message
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
    });
});

// Error middleware
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// eslint-disable-next-line no-unused-vars
// we need four agruments: err, req, res, next
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
