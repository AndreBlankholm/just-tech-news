const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');   //handelbars
const session = require('express-session');



const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});             //handelbars
 
app.engine('handlebars', hbs.engine);    //handelbars
app.set('view engine', 'handlebars');    //handelbars

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//joining files in plublic folder

app.use(require('./controllers/'));
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {   ////configuration parameter ({force: true}) means that the databases must sync with the model definitions and associations or they recreate!
  app.listen(PORT, () => console.log('Now listening'));
});
