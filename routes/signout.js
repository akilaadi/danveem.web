var express = require('express');
var session = require('express-session');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/index');
        }
    });
});

module.exports = router;