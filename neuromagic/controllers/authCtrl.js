neuromagicApp.controller('signupCtrl', ["$scope", "$location", "$http", '$timeout', '$state','AuthService',
    function($scope, $location, $http, $timeout, $state, AuthService) {
        $scope.isFormError = false;
        $scope.formError = '';
        $scope.FormData = {
            email: '',
            username: '',
            password: ''
        };
        $scope.signupSubmit = function(signupFormValid) {
            if (signupFormValid) {
                AuthService.signup($scope.FormData)
                    .then(function(response) {
                        var status = response.status;
                        if (status === 201){
                            console.log("signup successfull");
                            $state.go("login");
                        }
                        else{
                            $scope.isFormError = true;
                            $scope.formError = response.data.message
                        }
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
        $scope.formError = '';
        $scope.FormData = {
            email: '',
            password: ''
        };
        $scope.loginSubmit = function(loginFormValid) {
            if (loginFormValid) {
                AuthService.login($scope.FormData)
                    .then(function(response) {
                        var status = response.status;
                        if (status === 200){
                            console.log("login successfull");
                            $state.go("dashboard");
                        }
                        else{
                            $scope.isFormError = true;
                            $scope.formError = response.data.message
                        }
                    });
            } else {
                console.log("error in client side. No need to pass it in backend");
            }
        };
    }
]);

