neuromagicApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider
    /*=======================
    // Routes For Webpages //
    =======================*/
        .state("landing", {
            url: base_url,
            templateUrl: "modules/webpages/landing.html",
            controller: "landingCtrl",
            title: "Neuromagic | Home",
            authenticate: false
        })
        /*======================
        // Routes For Allauth //
        ======================*/
        .state("signup", {
            url: auth_url + "signup",
            templateUrl: 'modules/authorization/signup.html',
            controller: 'signupCtrl',
            title: "Neuromagic | signup",
            authenticate: false
        })
        .state("login", {
            url: auth_url + "login",
            templateUrl: 'modules/authorization/login.html',
            controller: 'loginCtrl',
            title: "Neuromagic | Login",
            authenticate: false
        })
        /*======================
        // Routes For Dashboard //
        ======================*/
        .state("dashboard", {
            url: auth_url + "dashboard",
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'dashboardCtrl',
            title: "Neuromagic | Dashboard",
            authenticate: true
        })
        /*===============================
        // Routes For user Error Pages //
        ===============================*/
        .state("404", {
            templateUrl: 'modules/webpages/404.html',
            title: "Neuromagic | Error 404",
            authenticate: false
        });

    // Send to 404 if the URL was not found
    // $urlRouterProvider.otherwise("/404");
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise(function($injector, $location) {
        var state = $injector.get('$state');
        state.go('404');
        return $location.path();
    });
});
