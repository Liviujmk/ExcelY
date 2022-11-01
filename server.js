const express = require('express');
const app = express();
const port = 1113;
const pdfParse = require('pdf-parse')
const fs = require('fs')
const pdfPath = "C:\\Users\\Luci the admin\\Downloads"
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


/*app.get('/', (req, res) => res.render('index'));*/

/*app.post('/', async(req, res) => {
    if(!req.files && !req.files.pdfFile){
        res.status(400).end();
    }

    pdfParse(req.files.pdfFile).then( pdf => {
        res.send(pdf.text.trim());
    })
    
})*/

app.listen(port || process.env.PORT, () => console.log(`Example app listening on port ${port}!`));

