const clientes = {}

clientes.read = (req, res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM clientes', (err, rows) => {
            if(err){
                res.json(err)
            }
            res.render('clientes', {
                data:rows
            })
        })
    })
}

clientes.add = (req,res) => {   
    const data = req.body
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
        }
        const query = conn.query('INSERT INTO clientes set ?', [data],(err, rows) => {
            res.redirect('/clientes')

        })
    })
}

clientes.delete = (req,res) => {   
    const {id} = req.params
    req.getConnection((err,conn) => {
        conn.query('DELETE FROM clientes where id = ?',[id],(err,rows) => {
            res.redirect('/clientes')
        })
    })
}

clientes.setUpd = (req,res) => {
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

clientes.update = (req,res) => {
    const {id} = req.params
    const newData = req.body
    req.getConnection((err, conn) => {
        conn.query("UPDATE clientes set ? where id = ?", [newData, id], (err, rows) => {
            res.redirect('/clientes')
            
        })
    })
    
}

module.exports = clientes