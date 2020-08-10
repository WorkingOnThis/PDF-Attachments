const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Importar rutas
const appRoutes = require('./routes/healthCheck');
const pdfAttachment = require('./routes/PDF-Attachment');

// settings
app.set('port', process.env.PORT || 3000);

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

// Middlewares
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Utilizar rutas
// app.use('/login', loginRoutes);
app.use('/', appRoutes);
app.use('/PDF-Attachments', pdfAttachment);

// Escuchar peticiones

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null);

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }

      results[name].push(net.address);
    }
  }
}

console.log(results)

app.listen(app.get('port'), () => {
  console.log('Servidor en puerto 3000');
})