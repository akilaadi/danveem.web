var express = require('express');
var session = require('express-session');
var router = express.Router();
var controler = require('../controllers/signin');


/* GET users listing. */
router.get('/:id_token', function (req, res) {

    controler.verifyIdToken(req.params.id_token,
        function (payload) {
            var sess = req.session;
            sess.userid = payload['sub'];
            sess.userFname = payload['given_name'];
            sess.name = payload['name'];
            sess.email = payload['email']; 
            console.log(payload);
            res.redirect('/home');
        },
        function (error) {
            res.send('Invalid!!');
        });
});

module.exports = router;