const express = require('express')
const router = express.Router()
const servicioController = require('../controllers/servicios.controller')

router.get('/', servicioController.read)

router.get('/upd/:id', servicioController.setServicio)
router.post('/upd/:id',servicioController.updServicio)
router.post('/emisora/add', servicioController.addEmisora)

router.get('/emisora/upd/:id', servicioController.setEmisora)
router.post('/emisora/upd/:id',servicioController.updEmisora)
router.post('/add', servicioController.add)

module.exports = router
