app.factory("noticesResource", ['$http', '$window',
    function ($http, $window) {

        let sessionData = $window.sessionData;

        let host = sessionData.serviceUrl;


        return {
            createNotice: function (title, content, userId, boardId) {

                var url = host + '/notices';

                return $http.post(url, {
                    title: title, content: content, userId: userId, boardId: boardId
                });
            },

            getNotice: function (noticeId) {

                var url = host + '/notices/' + noticeId;

                return $http.get(url);
            },

            getAllNoticesForABoard: function (boardId) {

                var url = host + '/notices/board/' + boardId;

                return $http.get(url);
            }
        };
    }
]);