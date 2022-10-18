const express = require('express');
const app = express();
const port = 1113;

//set ejs
app.set('view engine', 'ejs');

const pdfParse = require('pdf-parse')
const fs = require('fs')
const pdfPath = "C:\\Users\\Luci the admin\\Downloads"

//url encoded
app.use(express.urlencoded({ extended: true }));

//app.use file upload
const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.get('/', (req, res) => res.render('index'));

app.post('/', async(req, res) => {
    if(!req.files && !req.files.pdfFile){
        res.status(400).end();
    }

    pdfParse(req.files.pdfFile).then( pdf => {
        res.send(pdf.text.trim().split(" "));
    })
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

