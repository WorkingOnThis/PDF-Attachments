var express = require('express');
var attachments = require('../utils/multipleAttachments').attachments;

var app = express();

app.get('/', async (req, res, next) => {

  try {
    const files = [
      {
        name: 'Formulario-Tramite-numero-4331.pdf',
        url: 'https://pdf-lib.js.org/assets/us_constitution.pdf',
        mimeType: 'application/pdf',
        description: 'Principal',
        creationDate: new Date('1787/09/17'),
        modificationDate: new Date('1992/05/07'),
      },
      {
        name: 'us_constitution.pdf',
        url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/7000',
        mimeType: 'application/pdf',
        description: 'Secundario',
        creationDate: new Date('1787/09/17'),
        modificationDate: new Date('1992/05/07'),
      },
      {
        name: 'hard-test.pdf',
        url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/5556',
        mimeType: 'application/pdf',
        description: 'Secundario',
        creationDate: new Date('1787/09/17'),
        modificationDate: new Date('1992/05/07'),
      }
    ]
    // url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/7000',
    // url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/5556',

    const PDF = await attachments(files);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${files[0].name}`);
    res.send(PDF)

  } catch (err) {
    res.status(500).json({
      mensaje: 'Falló al intentar adjuntar los pdf'
    });
  }

});

module.exports = app;