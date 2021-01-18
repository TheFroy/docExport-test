const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mysql = require ('mysql')
const bodyParser = require('body-parser')
const myConnection = require('express-myconnection')
const dotenv = require('dotenv')
const session = require('express-session')
const flash = require('connect-flash')


const cotizarRoute = require('./src/routes/cotizar.route')
const clienteRoute = require('./src/routes/clientes.route')
const usuarioRoute = require('./src/routes/usuarios.route')
const loginRoute = require('./src/routes/login.route')
const serviciosRoute = require('./src/routes/servicios.route')

const app = express();

// settings
dotenv.config({ path: './.env'})
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views/pages'))

//middleware
app.use(session({
    secret: 'secret',
    cookie: {maxAge:Date.now() + 3.6e6},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
// app.user(app.router)
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
},'single'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
app.use('/',loginRoute)
app.use('/cotizacion',cotizarRoute)
app.use('/clientes',clienteRoute)
app.use('/usuarios',usuarioRoute)
app.use('/servicios',serviciosRoute)

//static files
app.use('/img', express.static(path.join(__dirname, '/src/public/')))


app.listen(app.get('port'), () => {
    console.log("Server running on port " + app.get('port'));
})