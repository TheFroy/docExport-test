const express = require('express')
const router = express.Router()
const cotizarController = require('../controllers/cotizar.controller')

router.get('/',cotizarController.read)

router.get('/:id', cotizarController.getDetalles)
module.exports = router