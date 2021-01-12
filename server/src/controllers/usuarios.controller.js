const usuario = {}
const bcrypt = require('bcryptjs')
const helper = require('../lib/helpers')

usuario.read = (req, res) => {
    if (req.session.loggedin){
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuarios', (err, rows) => {
                res.render('usuarios',{
                    message: [
                        req.flash('successDel'),
                        req.flash('successAdd'),
                        req.flash('successUpd'),
                        req.flash('successUpdPwd')
                    ],
                    data:rows
                })
            })
        })
    }
    else{
        res.redirect('/')
    }
}

usuario.add = (req, res) => {
    if(req.session.loggedin){
        req.body.pwd = helper.encryptPwd(req.body.pwd)
        const data = req.body
        req.getConnection((err, conn) => {
            const query = conn.query('INSERT INTO usuarios set ?',[data], (err,rows) => {
                if (!err) {
                    req.flash('successAdd',"Nuevo usuario agregado")
                    res.redirect('/usuarios')
                }
                else{
                    res.json(err)
                }
            })
        })
    }
    else{
        res.redirect('/')
    }
}

usuario.del = (req,res) => {
    if(req.session.loggedin){
        const {id} = req.params
        req.getConnection((err, conn) => {
            query = conn.query("DELETE FROM usuarios where id = ?",[id],(err, rows) => {
                if (!err) {
                    req.flash('successDel',"Usuario eliminado")
                    res.redirect('/usuarios')
                }
                else{
                    res.json(err)
                }
            })
        })
    }
    else{
        res.redirect('/')
    }
}

usuario.set_upd = (req, res) => {
    const {id} = req.params
    req.getConnection((err, conn) => {
        var query = conn.query("select * from usuarios where id = ?",[id],(err, rows) => {
            res.render('usuariosUpd', {
                data: rows[0]
            })
        })
    })
}

usuario.upd = (req, res) => {
    if (req.session.loggedin) {
        const {id} = req.params
        const data = req.body
        req.getConnection((err, conn) => {
            var query = conn.query("UPDATE usuarios set ? where id = ?",[data,id],(err, rows) => {
                if (!err) {
                    req.flash('successUpd',"Datos de usuario actualizados")
                    res.redirect('/usuarios')
                }
                else{
                    res.json(err)
                }
            })
        })
    }
    else{
        res.redirect('/')
    }
}

usuario.upd_pwd = (req, res) => {
    if(req.session.loggedin){
        const newPwd = helper.encryptPwd(req.body.pwd)
        const {id} = req.params
        req.getConnection((err, conn) => {
            query = conn.query("UPDATE usuarios set pwd = ? where id = ?",[newPwd, id], (err, rows) => {
                if (!err) {
                    req.flash('successUpdPwd',"Contraseña de usuario actualizada")
                    res.redirect('/usuarios')
                }
                else{
                    res.json(err)
                }
            })
        })
    }
    else{
        res.redirect('/')
    }
}

usuario.autenticar = (req, res) => {
    const {nombre} = req.body
    const {pwd} = req.body
    req.getConnection((err, conn) => {
        query = conn.query("SELECT * FROM usuarios where nombre = ?",[nombre, pwd], (err, rows)=>{
            if (rows.length > 0) {
                bcrypt.compare(pwd,rows[0].pwd, (err,result) => {
                    if (result){
                        req.session.save((err) => {
                            req.flash('loginSuccess','Bienvenido de nuevo ' + nombre + '!')
                            req.session.loggedin = true;
                            req.session.username = nombre;
                            res.redirect('/cotizacion')
                        })
                    }
                    else {
                        req.flash('error',"Contraseña incorrecta")
                        res.redirect('/')
                    }
                });
            }
            else {
                req.flash('error',"El usuario ingresado no existe")
                res.redirect('/')
            }
        })
    })
}

module.exports = usuario