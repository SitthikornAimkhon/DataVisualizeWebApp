require('dotenv').config({path:"../.env"});

const MongoModel = require('./Models/MongoModel');

const express = require('express');
const { SERVER_PORT, DB_URL } = process.env;

const app = express();
const model = new MongoModel(DB_URL);

// Example to use MongoModel
// app.get('/', async (req,res)=>{
// 	const data = await model.getAllAccident();
// 	res.json(data);
// })


app.listen(SERVER_PORT, () => {
	console.log(`listening on port ${SERVER_PORT}`)
  })
