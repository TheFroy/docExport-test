const servicios = {}

servicios.read = (req, res) => {
    req.getConnection((err, conn) => {
        if(!err){
            conn.query("select productos.id, productos.tipo, productos.precio_dia, emisoras.nombre as emisora from productos inner join emisoras on productos.id_emisora = emisoras.id", (err, rows1) => {
                if(!err){
                    conn.query("select * from emisoras", (err, rows2) => {
                        if(!err){
                            res.render('servicios.ejs', {
                                productos: rows1,
                                emisoras: rows2,
                                message:[
                                    req.flash('successProducto'),
                                    req.flash('successEmisora'),
                                    req.flash('updEmisora'),
                                    req.flash('updServicio'),
                                ]
                            })    
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
        else{
            res.json(err)
        }
    })
}

servicios.add = (req, res) => {
    const data = req.body
    req.getConnection((err, conn) => {
        if(!err){
            const query = conn.query("INSERT INTO productos set ?",[data],(err, rows) => {
                if(!err){
                    req.flash('successProducto',"Se han ingresado el nuevo servicio con exito!")
                    res.redirect('/servicios')
                }
            })
        }
        else{
            res.json(err)
        }
    })
}
servicios.addEmisora = (req, res) => {
    const data = req.body
    req.getConnection((err, conn) => {
        if(!err){
            const query = conn.query("INSERT INTO emisoras set ?",[data],(err, rows) => {
                if(!err){
                    req.flash('successEmisora',"Se han ingresado la nueva emisora con exito!")
                    res.redirect('/servicios')
                }
            })
        }
        else{
            res.json(err)
        }
    })
}

servicios.setServicio = (req, res) => {
    const {id} = req.params
    req.getConnection((err, conn) => {
        if(!err){
            conn.query("select * from productos where id = ?",[id],(err, rows1) => {
                conn.query("SELECT * from emisoras",(err, rows2) => {
                    if(!err){
                        res.render("servicioUpd",{ 
                            data: rows1[0],
                            emisoras: rows2
                        })
                    }
                    else{
                        res.json(err)
                    }
                })
            })
        }
        else{
            res.json(err)
        }
    })
}
    


servicios.setEmisora = (req, res) => {
    const {id} = req.params
    req.getConnection((err, conn) => {
        if(!err){
            const query = conn.query("select * from emisoras where id = ?",[id],(err, rows) => {
                if(!err){
                    res.render("emisoraUpd",{ 
                        data: rows[0]
                    })
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

servicios.updEmisora = (req, res) => {
    const data = req.body
    const {id} = req.params
    req.getConnection((err, conn) => {
        if(!err){
            const query = conn.query("UPDATE emisoras set ? where id = ?",[data,id],(err, rows) => {
                if(!err){
                    req.flash('updEmisora',"Se ha actualizado correctamente la emisora")
                    res.redirect('/servicios')
                }
                else{
                }
            })
        }
        else{
            res.json(err)
        }
    })
}

servicios.updServicio = (req, res) => {
    const data = req.body
    const {id} = req.params
    req.getConnection((err, conn) => {
        if(!err){
            const query = conn.query("UPDATE productos set ? where id = ?",[data,id],(err, rows) => {
                if(!err){
                    req.flash('updServicio',"Se ha actualizado correctamente el servicio")
                    res.redirect('/servicios')
                }
                else{
                }
            })
        }
        else{
            res.json(err)
        }
    })
}


module.exports = servicios;

