const express = require('express');
const path = require('path');
const morgan = require('morgan')
const mysql = require ('mysql')
const bodyParser = require('body-parser')
const myConnection = require('express-myconnection')

const cotizarRoute = require('./src/routes/cotizar.route')
const clienteRoute = require('./src/routes/clientes.route')
const usuarioRoute = require('./src/routes/usuarios.route')

const app = express();

// settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views/pages'))

//middleware
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'superUser',
    password: 'sudo',
    port: 3306,
    database: 'cotizacion'
},'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/',cotizarRoute)
app.use('/clientes',clienteRoute)
app.use('/usuarios',usuarioRoute)

//static files
app.use(express.static(path.join('./server/src/public')))

app.listen(app.get('port'), () => {
    console.log("Server running on port " + app.get('port'));
})