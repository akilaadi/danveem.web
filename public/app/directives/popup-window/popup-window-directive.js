app.directive("popupWindow", function () {
    return {
        restrict: "E",
        transclude: true,
        scope: {
            width: '=',
            height: '=',
            display: '=',
            onClose: '=',
            onOpen: '=',
            displayClose: '=?',
            popupTitle: '@',
            icon:'@',
            api: '='
        },
        link: function (scope, element, attrs) {
            scope.widthPx = scope.width ? scope.width : 300 + "px";
            scope.heightPx = scope.height ? scope.height : 200 + "px";
            scope.displayClose = scope.displayClose || typeof scope.displayClose === "undefined";
            scope.$watch('display', function () {
                if (scope.display) {
                    if (scope.onOpen) {
                        scope.onOpen();
                    }
                } else {
                    if (scope.onClose) {
                        scope.onClose();
                    }
                }
            });

            scope.api = {
                close: function(){
                    scope.display = false;
                }
            };
        },
        templateUrl: '../app/directives/popup-window/popup-window-template.html'
    };
});