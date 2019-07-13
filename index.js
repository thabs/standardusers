const express = require('express');
const bodyParser = require('body-parser');

const models = require('./server/models');
const routes = require('./server/routes/index');
const app = express();

//parses request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', routes);

models.sequelize.sync().then(() => {
const PORT = process.env.PORT || 5000;
  app.listen(PORT,function() {
    console.log('STANDARD USER SERVER LISTENING ON PORT ' + PORT);
  });
});