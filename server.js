const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

//dotnev
require('dotenv').config();
//connect to mongo db
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://Liviu:Liviu@cluster--1.5nsas.mongodb.net/ExcelY?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.listen(process.env.PORT || 5000, () => console.log(`Example app listening on port 5000!`));
