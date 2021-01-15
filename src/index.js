const pdfkit = require('pdfkit');
const blobStream = require('blob-stream')
const express = require('express');
const myConnection = require('express-myconnection')

const doc = new pdfkit
var data
(res, req) => {
    res.myConnection((err,conn) => {
        conn.query("SELECT * FROM emisoras", (err, rows) => {
            data = rows[0].nombre;
            pdfDocument(data)
        })
    })
}

function pdfDocument(data){ 
    doc.text(data,25,25)
    
    
    
    const stream = doc.pipe(blobStream())
    
    doc.end()
    
    stream.on('finish', () => {
        const url = stream.toBlobURL('application/pdf')
        const element = document.getElementById('pdf')
        element.setAttribute('href', url)
    })

}