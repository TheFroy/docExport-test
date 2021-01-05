const usuario = {}
const bcrypt = require('bcryptjs')

usuario.read = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios', (err, rows) => {
            console.log(rows);
            res.render('usuarios',{
                data:rows
            })
        })
    })
}

usuario.add = (req, res) => {
    req.body.pwd = bcrypt.hashSync('req.body.pwd',10)
    const data = req.body
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios set ?',[data], (err,rows) => {
            res.redirect('/usuarios')
        })
    })
}

usuario.del = (req,res) => {
    const {id} = req.params
    req.getConnection("DELETE FROM usuarios where id = ?",[id],(err, rows) => {
        res.redirect('/usuarios')
    })
}

module.exports = usuario