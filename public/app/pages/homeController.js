app.controller('homeController', ["$scope", "$window", "$timeout", '$http', 'userResource', 'boardResource', 'invitationResource',
  function ($scope, $window, $timeout, $http, userResource, boardResource, invitationResource) {
    $scope.newBoardTitle = {
      text: null
    };
    $scope.window = $window;

    $scope.createNewBoard = function (windowApi) {
      windowApi.close();
      $scope.showLoading = true;
      boardResource.createBoard({
        adminUserId: parseInt($window.sessionData.userid),
        title: $scope.newBoardTitle.text
      }).then(function (response) {
        boardResource.getBoardsForaUser($window.sessionData.userid).then(function (response) {
          $scope.allBoards = response.data;
          $scope.showLoading = false;
        });
      });
    };
    $scope.showLoading = true;
    userResource.getUser($window.sessionData.userid).then(function (user) {
      if (!user.data) {
        userResource.createUser({
          userid: parseInt($window.sessionData.userid),
          name: $window.sessionData.name,
          email: $window.sessionData.email
        }).then(function (response) {
          invitationResource.importBoardInvitations($window.sessionData.userid).then(function (response) {
            boardResource.getBoardsForaUser($window.sessionData.userid)
              .then(function (response) {
                $scope.allBoards = response.data;
                $scope.showLoading = false;
              });
          }).catch(function (error) {
            console.log(error);
          });
        });
      }
      else {
        invitationResource.importBoardInvitations($window.sessionData.userid).then(function (response) {
          boardResource.getBoardsForaUser($window.sessionData.userid)
            .then(function (response) {
              $scope.allBoards = response.data;
              $scope.showLoading = false;
            });
        }).catch(function (error) {
          console.log(error);
        });
      }
    });
  }]);