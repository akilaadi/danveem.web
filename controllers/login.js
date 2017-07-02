'user strict';
var GoogleAuth = require('google-auth-library');
var config = require('../config/credentials');
var CLIENT_ID = "376810094433-qfbk35pkjatuicilntnfhn30aq2q7gis.apps.googleusercontent.com";
var auth = new GoogleAuth;
var client = new auth.OAuth2(config.OAuth2.Google.CLIENT_ID, '', '');
var controller = {

    verifyIdToken: function (id_token,successCallback,errorCallback) {

        client.verifyIdToken(
            id_token,
            config.OAuth2.Google.CLIENT_ID,
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
            function (e, login) {
                var payload = login.getPayload();
                var userid = payload['sub'];
                console.log(payload);
                successCallback(userid);
                // If request specified a G Suite domain:
                //var domain = payload['hd'];
            });
    }
};

module.exports = controller