const express = require('express');
const morgan = require('morgan'); // shows the format and helps debug.
const helmet = require('helmet'); // block headers.
const cors = require('cors');

const middlewares = require('./middlewares'); // exporting file middlewares.js into index.js

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

// Errors middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHander);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
