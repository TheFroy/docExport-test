const express = require('express');
const router = express.Router()
const usuariosController = require('../controllers/usuarios.controller')


router.get('/', usuariosController.read)    
router.post('/add', usuariosController.add)

router.get('/del/:id', usuariosController.del)

router.get('/upd/:id', usuariosController.set_upd)
router.post('/upd/:id', usuariosController.upd)

router.post('/upd_pwd/:id', usuariosController.upd_pwd)

router.post('/autenticar', usuariosController.autenticar)

module.exports = router