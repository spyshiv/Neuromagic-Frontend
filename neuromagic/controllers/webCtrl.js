neuromagicApp.controller('navbarCtrl', ['$scope', '$rootScope', '$location', '$state',
    function($scope, $rootScope, $location, $state, AuthService, AUTH_EVENTS, Session) {
        console.log("This is navbar controller")
    }
]);


neuromagicApp.controller('landingCtrl', ["$scope", "$location", "$http", '$timeout',
    function($scope, $location, $http, $timeout, AuthService) {
        console.log("This is landing page controller")
    }
]);
