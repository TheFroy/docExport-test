const express = require('express');
const router = express.Router()
const usuariosController = require('../controllers/usuarios.controller')


router.get('/', usuariosController.read)    
router.post('/add', usuariosController.add)


module.exports = router