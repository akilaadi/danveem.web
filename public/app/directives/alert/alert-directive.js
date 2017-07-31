app.directive("fmsiAlert", ['$timeout', function ($timeout) {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            setApi: "=",
            type: "@",
            cssClass: "@",
            autoClose:'='
        },
        link: function (scope, element) {

            scope.displayMessage = function (state, close) {
                if (state) {
                    $(element).find(".ng-fmsi-alert").animate({
                        opacity: 1
                    }, {
                            duration: 500,
                            start: function () {
                                $(this).show();
                            }
                        });

                    if (scope.autoClose) {

                        $timeout(function () {

                            scope.displayMessage(false);
                        }, 5000);
                    }
                }
                else {
                    $(element).find(".ng-fmsi-alert").animate({
                        opacity: 0
                    }, {
                            duration: 500,
                            complete: function () {
                                $(this).hide();
                            }
                        });
                };
            };

            let api = {

                display: scope.displayMessage
            };

            scope.setApi(api);
        },
        templateUrl: '../app/directives/alert/alert-template.html'
    };
}]);