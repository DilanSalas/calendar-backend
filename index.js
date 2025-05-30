const express = require('express');
require('dotenv').config();
require('./controllers/passaport'); 
const cors = require('cors');   
const {dbConnection} =  require('./database/config')
const path = require('path');

const app = express();

//db
dbConnection();

//cors
app.use(cors());


//directorio publico
app.use(express.static('public'))

//lectura del body
app.use(express.json())

//rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Solo para rutas que NO son de API
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ ok: false, msg: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})






