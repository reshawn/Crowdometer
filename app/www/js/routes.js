angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/page1',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('locations', {
    url: '/page2',
    templateUrl: 'templates/locations.html',
    controller: 'locationsCtrl'
  })

  .state('foodCourt', {
    url: '/page4',
    templateUrl: 'templates/foodCourt.html',
    controller: 'foodCourtCtrl'
  })

  .state('jFKBusStop', {
    url: '/page5',
    templateUrl: 'templates/jFKBusStop.html',
    controller: 'jFKBusStopCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});