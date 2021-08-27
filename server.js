const express = require('express');
const app = express();
const planningRoutes = require('./routes/planning.routes');
require('dotenv').config({path : './config/.env'})
require('./config/db');
const cors = require('cors')

const corsOptions = {
    origin : process.env.CLIENT_URL,
    credentials : true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId', 'Set-Cookie'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
}

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.REACT_APP_PORT

app.use('/api', planningRoutes);

app.listen(port || 5000, () => {
    console.log(`Listening on port ${port}`);
})