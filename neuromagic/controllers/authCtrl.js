neuromagicApp.controller('registrationCtrl', ["$scope", "$location", "$http", '$timeout', 'AuthService',
    function($scope, $location, $http, $timeout, AuthService) {
        $scope.isFormError = false;
        $scope.signup_error = '';
        $scope.FormData = {
            email: '',
            username: '',
            password: ''
        };
        $scope.signupSubmit = function(signupFormValid) {
            if (signupFormValid) {
                AuthService.signup($scope.FormData)
                    .then(function(response) {
                    	console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
            } else {
                console.log("error in client side. No need to pass it in backend");
            }
        };
    }
]);


neuromagicApp.controller('loginCtrl', ['$scope', '$rootScope', '$location', '$state', 'AuthService',
    function($scope, $rootScope, $location, $state, AuthService) {
        $scope.isFormError = false;
        $scope.signup_error = '';
        $scope.FormData = {
            email: '',
            password: ''
        };
        $scope.loginSubmit = function(loginFormValid) {
            if (loginFormValid) {
                AuthService.login($scope.FormData)
                    .then(function(response) {
                        console.log(response);
                    }, function(error) {
                        console.log(error);
                    });
            } else {
                console.log("error in client side. No need to pass it in backend");
            }
        };
    }
]);

