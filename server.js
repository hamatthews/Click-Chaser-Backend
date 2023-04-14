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

const server = app.listen(port, () => {
    console.log('Server running on port ' + port);
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", socket => {
    console.log(socket.id);

    socket.on('click', placeName => {
        socket.broadcast.emit('click', placeName);
    })
});
