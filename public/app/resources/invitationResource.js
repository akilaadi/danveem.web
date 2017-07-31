app.factory("invitationResource", ['$http', '$window',
    function ($http, $window) {

        let sessionData = $window.sessionData;

        let host = sessionData.serviceUrl;


        return {
            createInvitation: function (data) {
                var url = host + '/invitations';

                return $http.post(url, data);
            },

            importBoardInvitations: function (userId) {
                var url = host + '/invitations/import/boards/';

                return $http.post(url, { userId: userId });
            },

            getInvitationsByEmail: function (email) {
                var url = host + '/invitations/' + email;

                return $http.get(url);
            }
        };
    }
]);