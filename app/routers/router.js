let express = require('express');
let router = express.Router();

const customers = require('../controllers/controller.js');

let path = __basedir + '/views/';

router.get('/', (req, res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "index.html");
});

router.get('/customers', (req, res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "customer.html");
});

// Define router for customer API
router.post('/api/customer/create', customers.create);
router.get('/api/customer/getall', customers.retrieveinfos);
router.get('/api/customer/findone/:id', customers.findById);
router.put('/api/customer/update/:id', customers.updateById);
router.delete('/api/customer/deletebyid/:id', customers.deleteById);

module.exports = router;
