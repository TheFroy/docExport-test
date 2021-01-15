const express = require('express')
const router = express.Router()

router.get('/',(req, res) => {
    if (req.session.loggedin) {
        res.session.save((err) => {
            if(!err) {
                res.redirect('/cotizacion')
            }
            else {
                res.json(err)
            }
        })
    }
    else {
        res.render('login',{
            error: req.flash('error')
        })
    }
})

router.get('/logout', (req, res) =>{
    req.session.destroy()
    // req.session.loggedin = false
    res.redirect('/')
})

module.exports = router