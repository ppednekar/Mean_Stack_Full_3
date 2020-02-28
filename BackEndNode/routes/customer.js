const express = require("express");
const router = express.Router();
const Customer = require('../models/CUSTOMER');
var objectID = require('mongodb').ObjectID;
const multer = require("multer");


// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
  }
});

let upload = multer({
  storage: storage
});



//TEST
// router.get('/', (req, res) => {

//     res.send('We are on post');
// });


// GET request
// Description : Get all customer data
router.get('/', async (req, res) => {
    try {

        let sortId = req.query.sort == 'asc' ? 1 : -1
        const customers = await Customer.find().sort({ date: sortId });
        res.json(customers);
    } catch (err) {
        res.json({ message: err });
    }

});


// GET request
// Description : Get searched customer data
router.get('/search', async (req, res) => {
    try {

        let searchKey = req.query.searchKey ? req.query.searchKey : "";
        let sortId = req.query.sort == 'asc' ? 1 : -1

        searchKey = '/'.concat(searchKey).concat('/');

        const customers = await Customer.find({name : /kk/})
            .sort({ date: sortId });
        res.json(customers);

    } catch (err) {
        res.json({ message: err });
    }

});



// POST request
// Description : Add customer data
router.post('/',  upload.single('image'),async (req, res) => {

    if (!req.file) {
        console.log("No file is available!");
    }
    console.log("req.file",req.file);

    let imageUrl = req.file ?
    process.env.HOST_NAME + process.env.PORT + '/uploads/' + req.file.filename
    : "";


    console.log("req.body",req.body);

    const customer = new Customer({
        name: req.body.name,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        photo: imageUrl,
        hobbies: req.body.hobbies,
       
    })

    try {
        const savedCustomerdata = await customer.save();
        res.json(savedCustomerdata)
    } catch (err) {
        res.status(500).json({ message: err });
    }

});


// PATCH request
// Description : Update customer data by customerId
router.patch('/:customerId', async (req, res) => {

    try {
        var userToUpdate = req.params.customerId;
        const updatedCustomerdata = await Customer.update
            (
                {
                    _id: userToUpdate
                },
                {
                    $set:
                    {
                        "name": req.body.name,
                        "gender": req.body.gender,
                        "address": req.body.address,
                        "city": req.body.city,
                        "state": req.body.state,
                        "country": req.body.country,
                        "photo": req.body.photo,
                        "hobbies": req.body.hobbies
                    }
                }
            )
        res.status(200).send(updatedCustomerdata)

    } catch (err) {
        res.status(404).send()
    }

});


// GET request
// Description : Get Specific customer data
router.get('/:customerId', async (req, res) => {
    try {
        const customers = await Customer.findById(req.params.customerId);
        res.json(customers);
    } catch (err) {
        res.json({ message: err });
    }
});

// DELETE request
// Description : Delete Specific customer data
router.delete('/:customerId', async (req, res) => {

    try {
        const removedData = await Customer.remove({ _id: req.params.customerId });
        res.json(removedData);
    } catch (err) {
        res.json({ message: err });
    }


});



module.exports = router