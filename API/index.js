const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./src/routes/routes');
require('dotenv').config({path:'variables.env'});

// init
const app = express();

// settings
 /* prod  arreglar error
    const host = process.env.HOST || '0.0.0.0'; 
*/
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// require db
require('./db');

// middlewares
app.use(morgan('dev'));
app.use(cors()); // habilitar cors

// dominios que soportan las peticiones

// routes
app.use('/',routes);

// carpeta publica
 app.use(express.static('src/uploads'));

// initialize server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

