app.controller('editBoardController', ["$scope", "$window", "$timeout", '$http', 'userResource', 'boardResource', 'noticesResource', '$routeParams', '$sce',
  function ($scope, $window, $timeout, $http, userResource, boardResource, noticesResource, $routeParams, $sce) {
    $scope.boardId = $routeParams.id;
    $scope.$sce = $sce;
    $scope.getAlertApi1 = function (api) {

      $scope.alertApi1 = api;
    };

    $scope.getAlertApi2 = function (api) {

      $scope.alertApi2 = api;
    };

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
      boardResource.shareBoard($routeParams.id, $scope.shareWithEmail.text, $window.sessionData.userid).then(function (response) {
        $scope.alertApi1.display(true);
        $scope.alertApi2.display(false);
      }).catch(function (error) {
        $scope.alertApi2.display(true);
        $scope.alertApi1.display(false);
      });
    };

    CKEDITOR.replace('mytextarea');
  }]);