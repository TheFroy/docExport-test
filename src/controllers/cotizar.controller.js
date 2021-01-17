const cotizacion = {}

cotizacion.read = (req, res) => {
    if (req.session.loggedin) {
        req.getConnection((err,conn) => {
            var query = "select cotizacion.id, cotizacion.fecha, clientes.nombre, SUM(detalle.dias_pautados*productos.precio_dia) as 'total' from clientes LEFT JOIN cotizacion ON cotizacion.id_cliente = clientes.id INNER JOIN detalle ON cotizacion.id = detalle.id_cotizacion INNER JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON productos.id_emisora = emisoras.id group by cotizacion.id order by cotizacion.fecha DESC;"
            conn.query(query, (err, rows) => {
                conn.query("SELECT id,nombre FROM clientes order by nombre", (err, rows2) => {
                    res.render('cotizaciones', {
                        message: [
                            req.flash('loginSuccess'),
                            // "Cotizacion añadida con sus detalles"
                        ],

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
            var query = "SELECT clientes.nombre,clientes.tipo,clientes.contacto, clientes.telefono, clientes.correo, clientes.direccion, cotizacion.id AS cotizacion_id,SUM(detalle.dias_pautados*productos.precio_dia) AS total_cotizacion,cotizacion.fecha, cotizacion.bonificacion FROM clientes LEFT JOIN cotizacion ON cotizacion.id_cliente = clientes.id INNER JOIN detalle ON cotizacion.id = detalle.id_cotizacion INNER JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON productos.id_emisora = emisoras.id WHERE cotizacion.id = ?"
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

cotizacion.add = (req, res) => {
    const data = req.body
    req.getConnection((err, conn) =>{
       if(!err){
           // CODIGO COMENTADO PARA QUE NO SE AGREGUEN DATOS DE PRUEBA
            const query = conn.query("insert into cotizacion set ?", [data], (err, rows1)=>{
                conn.query("SELECT id FROM cotizacion ORDER BY id DESC LIMIT 1 ", (err, rows2)=>{
                    console.log(rows2[0].id);
                    res.redirect("/cotizacion/add/detalle/"+rows2[0].id)
                    req.flash('success','Cotizacion añadida, agregar detalles de cotizacion')
                }) 
            })     
       }
       else{
           res.json(err)
       }
    })
}

cotizacion.detalle = (req, res) => {
    const {id} = req.params
    req.getConnection((err, conn) => {
        if (!err){
             conn.query("SELECT id, tipo from productos", (err, rows1) => {
                 res.render("detallesAdd", {
                     message: req.flash('success'),
                     id_cotizacion: id,
                     productos: rows1,
                     // cliente: rows2[0].nombre
                 })
            })
        }
        else{
            res.json(err)
        }
    })
}

cotizacion.detallesAdd = (req, res) => {
    const data = req.body
    const idContent = {id_cotizacion: req.params.id}
    console.log(data, req.params.id);
    req.getConnection((err, conn) => {
        if (!err) {
            const query = conn.query("INSERT INTO detalle set ?, ?", [data,idContent], (err, rows) => {
                if (!err) {
                    console.log(query);
                    res.render("detallesAsk",{
                        message: "Detalle añadido correctamente!",
                        id_cotizacion: idContent.id_cotizacion
                
                    })
                }
                else{
                    console.log(query);
                    res.json(err)
                }
            })
        }
        else{
            res.json(err)
        }
    })

}

cotizacion.add_bonificacion = (req, res) => {
        const data = req.body
        const {id} = req.params
        req.getConnection((err, conn) =>{
           if(!err){
               // CODIGO COMENTADO PARA QUE NO SE AGREGUEN DATOS DE PRUEBA
                const query = conn.query("insert into cotizacion set ? where id = ?", [data,id], (err, rows1)=>{
                    if (!err) {
                        res.redirect('/cotizacion/'+id)
                    }
                    else{
                        res.json(err)
                    }
                })     
           }
           else{
               res.json(err)
           }
        })
    
}

module.exports = cotizacion