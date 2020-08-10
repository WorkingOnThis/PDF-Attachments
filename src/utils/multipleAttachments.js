const { PDFDocument } = require('pdf-lib');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

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

  // const pathResult = path.resolve(__dirname, `../assets/results/mainFile.pdf`);
  // fs.writeFileSync(pathResult, await mainFile.save());

  const pdfBytes = await mainFile.save()
  const pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
  return pdfBuffer
}

exports.attachments = attachments;