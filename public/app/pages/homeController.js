app.controller('homeController', ["$scope", "$window", "$timeout", '$http', 'userResource', 'boardResource',
  function ($scope, $window, $timeout, $http, userResource, boardResource) {
    $scope.newBoardTitle = {
      text:null
    };
    $scope.createNewBoard = function (windowApi) {
      windowApi.close();
      boardResource.createBoard({
        adminUserId: parseInt($window.sessionData.userid),
        title: $scope.newBoardTitle.text
      }).then(function (response) {
        boardResource.getBoardsForaUser($window.sessionData.userid).then(function (response) {
          $scope.allBoards = response.data;
        });
      });
    };

    userResource.getUser($window.sessionData.userid).then(function (user) {
      if (user.data.Count === 0) {
        userResource.createUser({
          userid: parseInt($window.sessionData.userid),
          name: $window.sessionData.name,
          email: $window.sessionData.email
        }).then(function (response) {
          boardResource.getBoardsForaUser($window.sessionData.userid)
            .then(function (response) {
              $scope.allBoards = response.data;
            });
        });
      }
      else {
        boardResource.getBoardsForaUser($window.sessionData.userid)
          .then(function (response) {
            $scope.allBoards = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }]);