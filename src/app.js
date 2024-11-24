const express = require('express');
const bodyParser = require('body-parser');
const receiptRoutes = require('./routes/receiptRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/receipts', receiptRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
