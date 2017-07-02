var express = require('express');
var session = require('express-session');
var router = express.Router();
var controler = require('../controllers/login');


/* GET users listing. */
router.get('/:id_token', function (req, res) {

    controler.verifyIdToken(req.params.id_token,
        function (userid) {
            res.redirect('/home');
        },
        function (error) {
            res.send('Invalid!!');
        });
});

module.exports = router;