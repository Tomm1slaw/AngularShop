'use strict';

var controllersSite = angular.module('controllersSite', []);

//  =============== PRODUCTS ==================

controllersSite.controller('siteProducts', [
   '$scope',
   '$http',
   'cartSrv',
   function($scope, $http, cartSrv) {
      $http({
         method: 'GET',
         url: '/model/products.json'
      })
         .then(function(response) {
            $scope.products = response.data;
         })
         .catch(function() {
            console.log('Error');
         });

      $scope.addToCart = function(product) {
         cartSrv.add(product);
      };
   }
]);

controllersSite.controller('siteProduct', [
   '$scope',
   '$http',
   '$routeParams',
   'cartSrv',
   function($scope, $http, $routeParams, cartSrv) {
      $http({
         method: 'GET',
         url: '/model/products.json'
      })
         .then(function(response) {
            var products = response.data;
            $scope.product = products[$routeParams.id];
         })
         .catch(function() {
            console.log('Error');
         });

      $scope.addToCart = function(product) {
         cartSrv.add(product);
      };
   }
]);

//  =============== ORDERS ==================

controllersSite.controller('siteOrders', [
   '$scope',
   '$http',
   function($scope, $http) {
      $http({
         method: 'GET',
         url: '/model/orders.json'
      })
         .then(function(response) {
            $scope.orders = response.data;
         })
         .catch(function() {
            console.log('Error');
         });

      $scope.delete = function(order, $index) {
         $scope.orders.splice($index, 1);
         // przeslac dane DO API
      };
      $scope.changeStatus = function(order) {
         order.status === 0 ? (order.status = 1) : (order.status = 0);

         console.log(order.status);
      };
   }
]);

controllersSite.controller('cartCtrl', [
   '$scope',
   '$http',
   'cartSrv',
   '$filter',
   function($scope, $http, cartSrv, $filter) {
      $scope.cart = cartSrv.show();

      $scope.emptyCart = function() {
         cartSrv.empty();
      };

      $scope.total = function() {
         var total = 0;
         angular.forEach($scope.cart, function(item) {
            total += item.qty * item.price;
         });
         total = $filter('number')(total, 2);
         return total;
      };

      $scope.removeItem = function($index) {
         $scope.cart.splice($index, 1);
         cartSrv.update($scope.cart);
      };

      $scope.setOrder = function($event) {
         // Sprawdz czy uzytkownik jest zalogowany
         var loggedIn = true;

         if (!loggedIn) {
            $scope.alert = { type: 'warning', msg: 'Musisz być zalogowany' };
            $event.preventDefault();
            return false;
         }

         // Zapisz zamowienie w bazie

         console.log($scope.total());
         console.log($scope.cart);

         $scope.alert = {
            type: 'success',
            msg: 'Zamówienie złożone, trwa przekierowanie do płatności'
         };

         cartSrv.empty();
         $event.preventDefault();
         $('#paypalForm').submit();
      };

      $scope.$watch(function() {
         cartSrv.update($scope.cart);
      });
   }
]);

//  =============== LOGIN & REGISTER ==================

controllersAdmin.controller('login', [
   '$scope',
   '$http',
   function($scope, $http) {
      // TODO pobrac dane z formularza i przeslac do bazy uwierzytelniania
      $scope.input = {};

      $scope.formSubmit = function() {
         $scope.errors = {};
         $scope.errors.login = 'Błędne hasło lub email';
         console.log($scope.input);
      };
   }
]);

controllersAdmin.controller('register', [
   '$scope',
   '$http',
   function($scope, $http) {
      $scope.input = {};

      $scope.formSubmit = function() {
         $scope.errors = {};
         $scope.errors.login = true;
         console.log($scope.input);
      };

      console.log($scope.input);

      // TODO pobrac dane z formularza i przeslac do bazy uwierzytelniania
   }
]);
