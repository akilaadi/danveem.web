app.controller('viewBoardController', ["$scope", "$window", "$timeout", '$http', 'userResource', 'boardResource', 'noticesResource', '$routeParams', '$sce',
  function ($scope, $window, $timeout, $http, userResource, boardResource, noticesResource, $routeParams,$sce) {
    $scope.boardId = $routeParams.id;
    $scope.$sce = $sce;
    boardResource.getBoard($scope.boardId).then(function (response) {
      $scope.board = response.data;
      noticesResource.getAllNoticesForABoard($routeParams.id).then(function (response) {
        $scope.allNotices = response.data;
      });
    }).catch(function (error) {
      console.log(error);
    });
  }]);