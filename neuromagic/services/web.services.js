neuromagicApp.factory('AuthService', function($http, $rootScope, localStorageService, AUTH_EVENTS, Session) {
    var authService = {};

    authService.signup = function(signupFormData) {
        var req = {
            method: 'POST',
            url: backend_url + 'auth/signup/',
            data: signupFormData
        };
        return $http(req).then(function(response) {
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };

    authService.login = function(loginFormData) {
        var req = {
            method: 'POST',
            url: backend_url + 'auth/login/',
            data: loginFormData,
        };
        return $http(req).then(function(response) {
            Session.setItemsToStorage(response.data.token);
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };

    authService.logout = function() {
        var req = {
            method: 'POST',
            url: backend_url + 'api/auth/logout/',
            headers: { 'Authorization': 'Token ' + Session.getItemsFromStorage() },
        };
        return $http(req).then(function(response) {
            Session.destroyItemOnStorage();
            return response;
        }, function errorCallback(response) {
            return response;
        });
    };

    authService.isAuthenticated = function() {
        return !!Session.getItemsFromStorage();
    };

    return authService;
});


neuromagicApp.factory('Session', function($rootScope, localStorageService) {
    var session = {};
    session.setItemsToStorage = function(auth_token) {
        localStorageService.set("auth_token", auth_token);
    };
    session.getItemsFromStorage = function() {
        var auth_token = localStorageService.get("auth_token");
        return auth_token;
    };
    session.destroyItemOnStorage = function() {
        localStorageService.remove("auth_token");
    };
    return session;
});
