const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const multiHelpers = hbsHelpers()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const workRouter = require('./routes/work')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
app.engine(
  'hbs',
  hbs({
    helpers: {
      multiHelpers,
      makeArray: function(str) {
        return str.split(';')
      }, //Splits a string in to an array by the semicolons
    },
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    layoutsDir: 'views',
    defaultLayout: 'layout',
  }),
)

app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/work', workRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
