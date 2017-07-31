app.controller('editBoardController', ["$scope", "$window", "$timeout", '$http', 'userResource', 'boardResource', 'noticesResource', '$routeParams', '$sce',
  function ($scope, $window, $timeout, $http, userResource, boardResource, noticesResource, $routeParams, $sce) {
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

    $scope.newNoticeTitle = {
      text: null
    };
    $scope.shareWithEmail = {
      text: null
    };

    $scope.addNotice = function () {
      $scope.content = CKEDITOR.instances.mytextarea.getData();
      noticesResource.createNotice(
        $scope.newNoticeTitle.text,
        $scope.content,
        $window.sessionData.userid,
        $routeParams.id)
        .then(function (response) {
          noticesResource.getAllNoticesForABoard($routeParams.id).then(function (response) {
            $scope.allNotices = response.data;
          });
        })
        .catch(function (error) {

        });
    };

    $scope.shareBoard = function () {
      boardResource.shareBoard($routeParams.id, $scope.shareWithEmail.text,$window.sessionData.userid).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    };

    CKEDITOR.replace('mytextarea');
  }]);