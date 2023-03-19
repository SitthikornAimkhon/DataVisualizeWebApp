require('dotenv').config();


const express = require('express');
const app = express();
const cors = require('cors');
const accident = require('./routers/accident');
const { SERVER_PORT, DB_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use('/', accident);

const server = app.listen(SERVER_PORT, () => {
	console.log(`listening on port ${SERVER_PORT}`)
});

// Graceful shutdown
process.on('SIGINT', () => {
	server.close(() => {
	  console.debug('server closed')
	})
  })