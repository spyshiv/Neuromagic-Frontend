neuromagicApp.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$state',
    function($scope, $rootScope, $location, $state, AuthService, AUTH_EVENTS, Session) {
        console.log("This is login controller")
    }
]);


neuromagicApp.controller('registrationCtrl', ["$scope", "$location", "$http", '$timeout',
    function($scope, $location, $http, $timeout, AuthService) {
        console.log("This is registration controller")
    }
]);
