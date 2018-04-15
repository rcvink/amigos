var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('reflect-metadata');
var typeorm = require('typeorm');
var amigo = require('./entity/amigo');

// create connection
typeorm.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "amigos",
    password: "amigos",
    database: "amigos",
    synchronize: true,
    entitySchemas: [
        require('./entity/amigo')
    ]
})
    .then(function (connection) {
        var myAmigo = {
            name: "Test name",
            email: "test@email.com",
            password: "my password"
        };
        var amigoRepository = connection.getRepository("amigo");
        amigoRepository.save(myAmigo)
            .then(function(savedAmigo) {
                console.log("Amigo has been saved: ", savedAmigo);
            });
    });

// require routers
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
