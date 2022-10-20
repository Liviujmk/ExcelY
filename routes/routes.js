// create routes
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// import models
const User = require('../models/company')

//main
router.get('/', (req, res) => {
    res.render('index');
});

// get all companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
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
        const newCompany = await company.save();
        res.status(201).json(newCompany);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


router.get('/companies/:id', (req, res) => {
    res.render('company')
})

router.get('/companies/:id/records', (req, res) => {
    res.render('records')
})

router.get('/companies/:id/records/create', (req, res) => {
    res.render('createRec')
})

module.exports = router;
// create one company
