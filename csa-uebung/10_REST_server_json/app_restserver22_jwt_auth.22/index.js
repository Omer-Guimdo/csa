const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const movieRouter = require('./movie');
const loginRouter = require('./auth');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => response.redirect('/movie'));

app.use(morgan('common', { immediate: true }));

app.use('/login', loginRouter);
app.use('/movie', expressJwt({ secret: 'secret' }), movieRouter);
app.use(function(err, request, response, next) {
  if (err.name === 'UnauthorizedError') {
    response.status(401).json('unauthorized');
  } else {
    next();
  }
});

app.listen(8080, () => {
  console.log('Server is listening to http://localhost:8080');
});
