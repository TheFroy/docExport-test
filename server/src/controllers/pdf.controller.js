const pdfMakePrinter = require('pdfmake/src/printer');

pdfMaker = {}

pdfMaker.generate = (req, res) => {
  function generatePdf(docDefinition, callback)  {
      try {
        const fonts = {
            Roboto: {
              normal: 'C:/xampp/htdocs/doc export test/server/src/public/fonts/Roboto-Regular.ttf',
            }
          };
      const printer = new pdfMakePrinter(fonts);
      const doc = printer.createPdfKitDocument(docDefinition);
      
      let chunks = [];

      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      doc.on('end', () => {
        callback(Buffer.concat(chunks));
      });
      
      doc.end();
      
    } catch(err) {
      throw(err);
    }
  };

  const docDefinition = {
    content: ['This will show up in the file created']
  };
  
  generatePdf(docDefinition, (response) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(response); // Buffer data
  });
    

}


module.exports = pdfMaker