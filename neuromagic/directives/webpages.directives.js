neuromagicApp.directive('navbar', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/shared/navbar.html',
        controller: 'navbarCtrl',
    };
});


neuromagicApp.directive('sitefooter', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/shared/footer.html',
    };
});


neuromagicApp.directive('dashsidebar', function() {
    return {
        restrict: 'E',
        templateUrl: 'modules/shared/dashsidebar.html',
    };
});
