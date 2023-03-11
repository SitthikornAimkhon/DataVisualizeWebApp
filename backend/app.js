require('dotenv').config({path:"../.env"});


const express = require('express');
const app = express();
const accident = require('./routers/accident');
const { SERVER_PORT, DB_URL } = process.env;

app.use('/', accident);


app.listen(SERVER_PORT, () => {
	console.log(`listening on port ${SERVER_PORT}`)
});
