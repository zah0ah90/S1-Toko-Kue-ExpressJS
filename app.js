var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* add package */
const session = require('express-session');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/users');
let barangRouter = require('./routes/barang');
let barangMasukRouter = require('./routes/barang_masuk');
let barangKeluarRouter = require('./routes/barang_keluar');
let persediaanBarangRouter = require('./routes/persediaan_barang');
let laporanRouter = require('./routes/laporan');
let pimpinanRouter = require('./routes/pimpinan');

let fuzzyRouter = require('./routes/fuzzy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(session({ secret: 'keyboard cat', cookie: {} }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.stuff = {
    url: req.originalUrl
  }
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/admin', barangRouter);
app.use('/admin/barang-masuk/', barangMasukRouter);
app.use('/admin/barang-keluar/', barangKeluarRouter);
app.use('/admin/persediaan-barang/', persediaanBarangRouter);
app.use('/admin/laporan/', laporanRouter);
app.use('/pimpinan', pimpinanRouter);


app.use('/admin/', fuzzyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
