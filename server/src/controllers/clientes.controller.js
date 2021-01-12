const clientes = {}

clientes.read = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM clientes', (err, rows) => {
                if(err){
                    res.json(err)
                }
                res.render('clientes', {
                    message: [
                        req.flash('success'),
                        req.flash('successUpd')
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

clientes.add = (req,res) => {   
    if (req.session.loggedin) {
        const data = req.body
        req.getConnection((err, conn) => {
            if (err) {
                res.send("No se ha conectado a la base de datos")
                res.json(err)
            }
            conn.query('INSERT INTO clientes set ?', [data],(err, rows) => {
                if(!err) {
                    req.flash('success',"Nuevo cliente ingresado con exito!")
                    res.redirect('/clientes')
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

clientes.delete = (req,res) => {   
    if (req.session.loggedin) {
        const {id} = req.params
        req.getConnection((err,conn) => {
            conn.query('DELETE FROM clientes where id = ?',[id],(err,rows) => {
                res.redirect('/clientes')
            })
        })
    }
    else{
        res.redirect('/')
    }
}

clientes.setUpd = (req,res) => {
    if (req.session.loggedin) {
        const {id} = req.params
        req.getConnection((err, conn) => {
            conn.query("SELECT * FROM clientes where id = ?", [id], (err, rows) => {
                conn.query("select cotizacion.id, cotizacion.fecha, clientes.nombre, SUM(detalle.total) as 'total' from ((cotizacion inner join clientes on cotizacion.id_cliente = clientes.id) inner join detalle on cotizacion.id = detalle.id_cotizacion) WHERE clientes.id = ? group by cotizacion.id;", [id], (err, rows2) => {
                    res.render('clientesUpd', {
                        data:rows['0'],
                        data2: rows2
                    })
                    
                })
                
            })
        })
    }
    else{
        res.redirect('/')
    }
    
}

clientes.update = (req,res) => {
    if (req.session.loggedin) {
        const {id} = req.params
        const newData = req.body
        req.getConnection((err, conn) => {
            conn.query("UPDATE clientes set ? where id = ?", [newData, id], (err, rows) => {
                if (!err) {
                    req.flash('successUpd',"Cliente actualizado con exito!")
                    res.redirect('/clientes')
                    
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

module.exports = clientes