const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clientes.controller')

router.get('/',clienteController.read)

router.post('/add', clienteController.add)

router.get('/delete/:id', clienteController.delete)

router.get('/update/:id', clienteController.setUpd)
router.post('/update/:id', clienteController.update)

module.exports = router