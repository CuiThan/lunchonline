var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Setting = require('../common/Setting')

var VerifyToken = require('../auth/VerifyToken');
var requestPromise = require('request-promise');
var request = require('request');

var User = require('../client_app/User');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/searchcustommer',VerifyToken, function(req, res) {
    var id = req.body.code;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var fullName = req.body.fullName;
    var status = req.body.status;
    var pageIndex = req.body.pageIndex;
    var pageSize = req.body.pageSize;

    var jsonBody = {};

    if (id != undefined && id != null && id != ''){
        jsonBody["_id"] = id;
    }

    if (email != undefined && email != null && email != ''){
        jsonBody["email"] = email;
    }

    User.find(jsonBody).skip((pageIndex -1)*pageSize).limit(pageSize).exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.json(articles);
        }
    });;
});


module.exports = router;
