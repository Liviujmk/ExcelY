// create routes
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')



// import models
const Company = require('../models/company')
//import loadingtypes

//main
router.get('/', (req, res) => {
    res.render('index');
});

// get all companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find({});
        res.render('companies', { companies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// create one company
router.get('/companies/new', (req, res) => {
    res.render('createCom')
})

router.post('/companies', async (req, res) => {
    const company = new Company({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    })

    try {
        await company.save();
        res.redirect('/companies');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.get('/companies/:id', async(req, res) => {
    const company = await Company.findById(req.params.id);
    res.render('company', { company });
})

router.get('/companies/:id/createTruck', async(req, res) => {
    const company = await Company.findById(req.params.id);
    res.render('createTruck', { company });
})

router.post('/companies/:id/trucks', async(req, res) => {
    const company = await Company.findById(req.params.id);
    const truck = {
        number: req.body.number
    }
    company.trucks.push(truck);
    await company.save();
    res.redirect(`/companies/${company.id}`);
})

router.get('/companies/:id/trucks/:number', async(req, res) => {
    let truckArray = {}
    const company = await Company.findById(req.params.id);
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truckArray = truck;
        }
    })
    res.render('truck', { truck: truckArray, company });
})

router.get('/companies/:id/trucks/:number/records/:commandNr', async(req, res) => {
    let truckArray = {}
    const company = await Company.findById(req.params.id);
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truckArray = truck;
        }
    })
    let recordArray
    truckArray.records.forEach(record => {
        if(record.commandNr === req.params.commandNr){
            recordArray = record;
        }
    })
    console.log(recordArray);
    res.render('record', { company, truck: truckArray, record: recordArray });
})

router.get('/companies/:id/trucks/:number/createRecord', async(req, res) => {
    let truckArray = {}
    const company = await Company.findById(req.params.id);
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truckArray = truck;
        }
    })
    res.render('createRec', { truck: truckArray, company });
})

router.post('/companies/:id/trucks/:number/records', async(req, res) => {
    const company = await Company.findById(req.params.id);
    /// loading types

    const loadingt1 = [{
        loadCompany: req.body.loadCompany,
        loadAddress: req.body.loadAddress
    }]

    const loadingt2 = [
        {
            loadCompany: req.body.loadCompany,
            loadAddress: req.body.loadAddress
        },
        {
            loadCompany: req.body.loadCompany2,
            loadAddress: req.body.loadAddress2
        }
    ]

    //unloading types

    const unloadingt1 = [
        {
            unloadCompany: req.body.unloadCompany,
            unloadAddress: req.body.unloadAddress
        }
    ]

    const unloadingt2 = [
        {
            unloadCompany: req.body.unloadCompany,
            unloadAddress: req.body.unloadAddress
        },
        {
            unloadCompany: req.body.unloadCompany2,
            unloadAddress: req.body.unloadAddress2
        }

    ]

    const unloadingt3 = [
        {
            unloadCompany: req.body.unloadCompany,
            unloadAddress: req.body.unloadAddress
        },
        {
            unloadCompany: req.body.unloadCompany2,
            unloadAddress: req.body.unloadAddress2
        },
        {
            unloadCompany: req.body.unloadCompany3,
            unloadAddress: req.body.unloadAddress3
        }    
    ]

    const unloadingt4 = [
        {
            unloadCompany: req.body.unloadCompany,
            unloadAddress: req.body.unloadAddress
        },
        {
            unloadCompany: req.body.unloadCompany2,
            unloadAddress: req.body.unloadAddress2
        },
        {
            unloadCompany: req.body.unloadCompany3,
            unloadAddress: req.body.unloadAddress3
        },
        {
            unloadCompany: req.body.unloadCompany4,
            unloadAddress: req.body.unloadAddress4
        }
    ]
    let loadings = []
    let unloadings = []
    if(req.body.loadingsNr === '1'){
        loadings = loadingt1;
    }else
    if(req.body.loadingsNr === '2'){
        loadings = loadingt2;
    }


    if(req.body.unloadingsNr === '1'){
        unloadings = unloadingt1;
    }else
    if(req.body.unloadingsNr === '2'){
        unloadings = unloadingt2;
    }else
    if(req.body.unloadingsNr === '3'){
        unloadings = unloadingt3;
    }else
    if(req.body.unloadingsNr === '4'){
        unloadings = unloadingt4;
    }
    const commandDate = new Date(req.body.commandDate).toLocaleDateString("en-UK");
    const creditNoteDate = new Date(req.body.creditNoteDate).toLocaleDateString("en-UK");
    
    const record = {
        commandNr: req.body.commandNr,
        commandDate,
        creditNoteNr: req.body.creditNoteNr,
        creditNoteDate,
        loadings,
        unloadings,
        paymentStatus: req.body.paymentStatus,
        km: req.body.km,
        price: req.body.price
    }
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truck.records.push(record);
        }
    })
    await company.save();
    res.redirect(`/companies/${company.id}/trucks/${req.params.number}`);
})

//delete record
router.post('/companies/:id/trucks/:number/records/:commandNr/delete', async(req, res) => {
    const company = await Company.findById(req.params.id);
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truck.records.forEach(record => {
                if(record.commandNr === req.params.commandNr){
                    record.remove();
                }
            })
        }
    })
    await company.save();
    res.redirect(`/companies/${company.id}/trucks/${req.params.number}`);
})

module.exports = router;
