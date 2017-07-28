app.factory("userResource", ['$http', '$window',
    function ($http, $window) {

        let sessionData = $window.sessionData;

        let host = sessionData.serviceUrl; 


        return {
            createUser: function (data) {

                var url = host + '/users';

                return $http.post(url, data);
            },

            getUser: function (userId) {

                var url = host + '/users/' + userId;

                return $http.get(url);
            }
        };
    }
]);