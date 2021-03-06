var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Email = require('../models/email');

const username = process.env.DB_USER;
const password = process.env.DB_PASS;

var connectString = "mongodb://" + username + ":" + password + "@cluster0-shard-00-00-ijr8i.mongodb.net:27017,cluster0-shard-00-01-ijr8i.mongodb.net:27017,cluster0-shard-00-02-ijr8i.mongodb.net:27017/techbud-emails?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(connectString);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    if (validateEmail(req.body.email)) {
        Email.findOne({ email: req.body.email }, function(err, savedEmail) {
            if (err) {
                res.status(500);
                res.send("Something went wrong");
            } else {
                if (!savedEmail) {
                    var email = new Email({ email: req.body.email });
                    email.save();
                    res.status(200);
                    res.send("Success!");
                } else {
                    res.status(400);
                    res.send("Already exists");
                }
            }
        });
    } else {
        res.status(400);
        res.send("Invalid email");
    }
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = router;