var neuromagicApp = angular.module('neuromagicApp', ['ui.router', 'LocalStorageModule', 'ngMessages']);
var base_url = "/";
var auth_url = "/auth/";
var backend_url = "http://52.172.204.243:8000/api/";

neuromagicApp.config(function($urlMatcherFactoryProvider, localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('neuromagicApp')
        .setNotify(true, true);
    $urlMatcherFactoryProvider.strictMode(false);

});
