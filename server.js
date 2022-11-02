const express = require('express');
const app = express();
const port = 1113;
const fileUpload = require('express-fileupload');

//dotnev
require('dotenv').config();
//connect to mongo db
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => console.log(err));

//set ejs
app.set('view engine', 'ejs');
//url encoded
app.use(express.urlencoded({ extended: true }));
// expres static
app.use('/static', express.static('static'))
//app.use file upload
app.use(fileUpload());
//import routes
const routes = require('./routes/routes.js');
app.use('/', routes);
app.listen(5000 || process.env.PORT, '0.0.0.0',() => console.log(`Example app listening on port !`));
