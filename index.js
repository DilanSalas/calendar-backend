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


//lectura del body
app.use(express.json())

//rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})






