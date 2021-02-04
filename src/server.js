const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);


app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/html/login.html');
});


app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/books`, bookRouter);
app.use(`/api/v1/authors`, authorRouter);


app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
