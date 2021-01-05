const express = require('express')
const router = express.Router()
const cotizarController = require('../controllers/cotizar.controller')
const clienteController = require('../controllers/clientes.controller')

router.get('/',cotizarController.read)

router.get('/cotizacion/:id', cotizarController.getDetalles)
module.exports = router