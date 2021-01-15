const pdfMakePrinter = require('pdfmake/src/printer');

pdfMaker = {}

pdfMaker.generate = (req, res) => {
    
// const { createInvoice } = require("./createInvoice.js");



// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000
//     }
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234
// };

// createInvoice(invoice, "cotizacion.pdf");

  // const id = req.params.id_cotizacion
  // req.getConnection((err,conn) => {
  //     var query = "SELECT clientes.nombre,clientes.tipo,clientes.contacto, clientes.telefono, clientes.correo, clientes.direccion, cotizacion.id AS cotizacion_id,SUM(detalle.dias_pautados*productos.precio_dia) AS total_cotizacion,cotizacion.fecha, cotizacion.bonificacion FROM clientes LEFT JOIN cotizacion ON cotizacion.id_cliente = clientes.id INNER JOIN detalle ON cotizacion.id = detalle.id_cotizacion INNER JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON productos.id_emisora = emisoras.id WHERE cotizacion.id = ?"
  //     conn.query(query, [id], (err, rows1) => {
  //         query = "SELECT detalle.dias_pautados, detalle.fecha_inicio, detalle.fecha_final, detalle.detalles, productos.tipo, productos.precio_dia, detalle.dias_pautados * productos.precio_dia AS Total, emisoras.nombre AS emisora FROM detalle LEFT JOIN productos ON productos.id = detalle.id_producto INNER JOIN emisoras ON emisoras.id = productos.id_emisora WHERE detalle.id_cotizacion = ?"
  //         conn.query(query, [id], (err, rows2) => {
  //             console.log(rows1,rows2);
  //             var detalles = []
  //             rows2.forEach(element => {
  //               detalles.push(element)
  //             });
  //             console.log(detalles);

  //             function generatePdf(docDefinition, callback)  {
  //                 try {
  //                   const fonts = {
  //                       Roboto: {
  //                         normal: 'C:/xampp/htdocs/doc export test/server/src/public/fonts/Roboto-Regular.ttf',
  //                         bold: 'C:/xampp/htdocs/doc export test/server/src/public/fonts/Roboto-Bold.ttf',
  //                       }
  //                     };
  //                 const printer = new pdfMakePrinter(fonts);
  //                 const doc = printer.createPdfKitDocument(docDefinition);
                  
  //                 let chunks = [];
            
  //                 doc.on('data', (chunk) => {
  //                   chunks.push(chunk);
  //                 });
                  
  //                 doc.on('end', () => {
  //                   callback(Buffer.concat(chunks));
  //                 });
                  
  //                 doc.end();
                  
  //               } catch(err) {
  //                 throw(err);
  //               }
  //             };
              
  //             const docDefinition = {
  //               content: [
  //                 // JSON.stringify(rows1),
  //                 // "probado"+print(JSON.stringify(rows1[0].nombre)),
  //                 // "probado"+print(JSON.stringify(rows2[0].tipo)),
  //                 printIt(rows2),
  //                 {
  //                   text: 'Cotizacion #',
  //                   fontSize: 25,
  //                   bold: true,
  //                   alignment: 'center'
  //                 },
  //                 {columns: [
  //                   {
  //                     image: 'C:/xampp/htdocs/doc export test/server/src/public/img/Blast logo.png',
  //                     width: 150
  //                   },
  //                   {
  //                     image: 'C:/xampp/htdocs/doc export test/server/src/public/img/Mix logo.png',
  //                     width: 150
  //                   },
  //                   {
  //                     image: 'C:/xampp/htdocs/doc export test/server/src/public/img/Tipik logo.png',
  //                     width: 150
  //                   },
  //                 ]},
  //               ],
  //               settings: [
  //                 {title: "cotizacion"}
  //               ]
  //             };
              
  //             generatePdf(docDefinition, (response) => {
  //               res.setHeader('Content-Type', 'application/pdf');
  //               res.send(response); // Buffer data
  //             });
  //         })
  //     })
  // })

}


module.exports = pdfMaker