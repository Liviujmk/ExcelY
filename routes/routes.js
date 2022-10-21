// create routes
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// import models
const Company = require('../models/company')

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
    const record = {
        commandNr: req.body.commandNr,
        commandDate: req.body.commandDate,
        creditNoteNr: req.body.creditNoteNr,
        creditNoteDate: req.body.creditNoteDate,
        loadings: [{ 
            loadCompany: req.body.loadCompany,
            loadAddress: req.body.loadAddress
        }],
        unloadings: [{
            unloadCompany: req.body.unloadCompany,
            unloadAddress: req.body.unloadAddress
        }],
        paymentStatus: req.body.paymentStatus
    }
    company.trucks.forEach(truck => {
        if(truck.number === req.params.number){
            truck.records.push(record);
        }
    })
    await company.save();
    res.redirect(`/companies/${company.id}/trucks/${req.params.number}`);
})

module.exports = router;
// create one company
