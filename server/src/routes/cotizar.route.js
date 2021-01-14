const express = require('express')
const router = express.Router()
const cotizarController = require('../controllers/cotizar.controller')
const pdfController = require('../controllers/pdf.controller')

router.get('/',cotizarController.read)

router.get('/:id', cotizarController.getDetalles)

router.post('/add', cotizarController.add)

router.get('/add/detalle/:id', cotizarController.detalle)

router.post('/add/detalle/:id', cotizarController.detallesAdd)

router.get('/pdf/generar', pdfController.generate)
module.exports = router