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

app.get('/', (req, res) => res.render('index'));

app.post('/', async(req, res) => {
    const file = req.body.fileName;
    if(file) {
        res.send(req.body.file);
        const getPDF = async (file) => {
            let readFileSync = fs.readFileSync(file)
            try {
                let pdfExtract = await pdfParse(readFileSync)
                console.log('File content: ', pdfExtract.text)
                console.log('Total pages: ', pdfExtract.numpages)
                console.log('All content: ', pdfExtract.info)
            } catch (error) {
                throw new Error(error)
            }
        }
        const pdfRead = `${pdfPath}\\${file}`
        console.log(pdfRead);
        getPDF(pdfRead)
    }
    //res.redirect('/');
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

