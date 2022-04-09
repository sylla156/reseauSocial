const express = require('express');
const process = require('process');
const userRoutes = require('./routes/user.routes.js')
const dotenv = require('dotenv');
require('./config/db.js');


dotenv.config({path: './config/.env'})
const app = express();

app.use(express.json())
app.use('/api/user', userRoutes);



app.listen(process.env.PORT, () => {
    console.log('server start');
})