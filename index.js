const express = require('express');
require('dotenv').config();
const cors = require('cors');   
const {dbConnection} =  require('./database/config')


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

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})






