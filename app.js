const express = require('express');

const router = express.Router();
const app = express();

const port = process.env.PORT || 3000;

// Init Middleware
app.use(express.json());

// Define routes
app.use('/api/ping', require('./api/ping'));
app.use('/api/posts', require('./api/posts'));

module.exports = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
