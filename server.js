require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.dbURI)
.then(() => {
    console.log('Connected to database')
})

const localesRouter = require('./routes/locales');

app.use('/locales', localesRouter);

app.listen(port, () => {
    console.log('Server running on port ' + port);
})



