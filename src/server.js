const express = require("express");
const dotenv = require('dotenv');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');

const app = express();
dotenv.config();
app.use(express.json());


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const port = Number(process.env.PORT || 3331);

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
