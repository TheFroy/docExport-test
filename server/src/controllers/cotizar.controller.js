const cotizacion = {}

cotizacion.read = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err,conn) => {
            var query = "select cotizacion.id, cotizacion.fecha, clientes.nombre, SUM(detalle.total) as 'total' from ((cotizacion inner join clientes on cotizacion.id_cliente = clientes.id) inner join detalle on cotizacion.id = detalle.id_cotizacion) group by cotizacion.id order by cotizacion.fecha DESC;"
            conn.query(query, (err, rows) => {
                conn.query("SELECT nombre FROM clientes order by nombre", (err, rows2) => {
                    res.render('cotizaciones', {
                        message: req.flash('loginSuccess'),
                        data: rows,
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

cotizacion.getDetalles = (req, res) => {
    if (req.session.loggedin) {
        const {id} = req.params
        console.log(id);
        req.getConnection((err,conn) => {
            var query = "SELECT clientes.nombre,clientes.tipo,clientes.contacto, clientes.telefono, clientes.correo, clientes.direccion, cotizacion.id AS cotizacion_id,SUM(detalle.total) AS total_cotizacion,cotizacion.fecha, cotizacion.bonificacion FROM clientes LEFT JOIN cotizacion ON cotizacion.id_cliente = clientes.id INNER JOIN detalle ON cotizacion.id = detalle.id_cotizacion INNER JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON productos.id_emisora = emisoras.id WHERE cotizacion.id = ?"
            conn.query(query, [id], (err, rows1) => {
                query = "SELECT detalle.dias_pautados, detalle.fecha_inicio, detalle.fecha_final, detalle.detalles, productos.tipo, productos.precio_dia, detalle.dias_pautados * productos.precio_dia AS Total, emisoras.nombre AS emisora FROM detalle LEFT JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON emisoras.id = productos.id_emisora WHERE detalle.id_cotizacion = ?"
                conn.query(query, [id], (err, rows2) => {
                    res.render('cotizacionDetalles', {
                        data1: rows1,
                        data2: rows2,
                    })
                })
            })
        })
    }
    else{
        res.redirect('/')
    }
}

module.exports = cotizacion