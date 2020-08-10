const { PDFDocument } = require('pdf-lib');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

run().catch(err => console.log(err));

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
    url: 'https://pdf-lib.js.org/assets/us_constitution.pdf',
    mimeType: 'application/pdf',
    description: 'Secundario',
    creationDate: new Date('1787/09/17'),
    modificationDate: new Date('1992/05/07'),
  },
  {
    name: 'Formulario-Tramite-numero-5136.pdf',
    url: 'https://pdf-lib.js.org/assets/us_constitution.pdf',
    mimeType: 'application/pdf',
    description: 'Secundario',
    creationDate: new Date('1787/09/17'),
    modificationDate: new Date('1992/05/07'),
  }
]
// url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/7000',
// url: 'https://biendefamilia.cba.gov.ar/rgp-bpm-servicios/api/adjuntos/descargarAdjunto/5556',
async function attachments(files) {

  const urlMainFile = await fetch(files[0].url).then(res => res.arrayBuffer())
  const mainFile = await PDFDocument.load(urlMainFile)

  const [, ...attacheds] = files;

  await Promise.all(attacheds.map(async (item) => {
    const archivo = await fetch(item.url).then(res => res.arrayBuffer())

    await mainFile.attach(archivo, item.name, {
      mimeType: item.mimeType,
      description: item.description,
      creationDate: item.creationDate,
      modificationDate: item.modificationDate
    })
  }));

  const pathResult = path.resolve(__dirname, `./assets/results/mainFile.pdf`);
  fs.writeFileSync(pathResult, await mainFile.save());
}

module.exports.attachments = attachments;