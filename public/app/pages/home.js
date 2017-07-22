app.controller('HomeController', ["$scope", "$window", "$timeout", '$http',
  function ($scope, $window, $timeout, $http) {

    $scope.createNewBoard = function (windowApi) {
      windowApi.close();
      $http.post($window.sessionData.serviceUrl + '/boards', {
        adminUserId: parseInt($window.sessionData.userid),
        title: $('#txtBoardTitle').val()
      }).then(function (response) {
        $http.get($window.sessionData.serviceUrl + '/boards/user/' + $window.sessionData.userid)
          .then(function (response) {
            $scope.allBoards = response.data;
          });
      });
    };

    $http.get($window.sessionData.serviceUrl + '/users/' + $window.sessionData.userid).then(function (user) {
      if (user.data.Count === 0) {
        $http.post($window.sessionData.serviceUrl + '/users', {
          userid: parseInt($window.sessionData.userid),
          name: $window.sessionData.name,
          email: $window.sessionData.email
        }).then(function (response) {
          $http.get($window.sessionData.serviceUrl + '/boards/user/' + $window.sessionData.userid)
            .then(function (response) {
              $scope.allBoards = response.data;
            });
        });
      }
    });
  }]);