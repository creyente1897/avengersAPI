const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
const app = express();

//DB
const db = require('./config/keys').MongoURI;

//Mongoose Connect
mongoose.connect(db, { useNewUrlParser: true })
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.log(err);
});

// Heros routes
const herosRoutes = require('./heros.routes');

// Body Parser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});

const router = express.Router();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use('/',router);

herosRoutes(router);

app.listen(PORT, (req, res) => {
    console.log(`Server is up and running on ${PORT} port.`);
})