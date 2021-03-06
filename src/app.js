// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import trackersRouter from './routes/trackers';
import entriesRouter from './routes/entries';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/trackers', trackersRouter);
app.use('/entries', entriesRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

export default app;
