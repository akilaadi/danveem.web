app.factory("boardResource", ['$http', '$window',
    function ($http, $window) {

        let sessionData = $window.sessionData;

        let host = sessionData.serviceUrl;


        return {
            createBoard: function (data) {
                var url = host + '/boards';

                return $http.post(url, data);
            },

            getBoardsForaUser: function (userId) {
                var url = host + '/boards/user/' + userId;

                return $http.get(url);
            },

            getBoard: function (boardId) {
                var url = host + '/boards/' + boardId;

                return $http.get(url);
            },

            shareBoard: function (boardId, email, userId) {
                var url = host + '/boards/share';

                return $http.post(url, { email: email, boardId: boardId, userId: userId });
            }
        };
    }
]);