'use strict';

var controllersAdmin = angular.module('controllersAdmin', ['angularFileUpload', 'myDirectives']);

//  =============== PRODUCTS ==================

controllersAdmin.controller('products', [
   '$scope',
   '$http',
   function($scope, $http) {
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

      $scope.delete = function(product, $index) {
         if (!confirm('Czy na pewno chcesz usunąć ten produkt?')) return false;

         $scope.products.splice($index, 1);
         // przeslac dane DO API
      };
   }
]);

controllersAdmin.controller('productEdit', [
   '$scope',
   '$http',
   '$routeParams',
   'FileUploader',
   function($scope, $http, $routeParams, FileUploader) {
      $http({
         method: 'POST',
         url: '/model/products.json'
      })
         .then(function(response) {
            var products = response.data;
            $scope.product = products[$routeParams.id];
         })
         .catch(function() {
            console.log('Error');
         });
      $scope.saveChanges = function(product) {
         // przeslac dane DO API

         console.log(product);
         console.log($routeParams.id);
      };

      var uploader = ($scope.uploader = new FileUploader({
         url: '' // ścieżka do api obsługującego upload
      }));

      uploader.filters.push({
         name: 'imageFilter',
         fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
         }
      });

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
         console.info('onCompleteItem', fileItem, response, status, headers);
      };
   }
]);

controllersAdmin.controller('productCreate', [
   '$scope',
   '$http',
   function($scope, $http) {
      $scope.createProduct = function() {
         console.log($scope.product);
      };
   }
]);

//  =============== USERS ==================

controllersAdmin.controller('users', [
   '$scope',
   '$http',
   function($scope, $http) {
      $http({
         method: 'GET',
         url: '/model/users.json'
      })
         .then(function(response) {
            $scope.users = response.data;
         })
         .catch(function() {
            console.log('Error');
         });

      $scope.delete = function(user, $index) {
         if (!confirm('Czy na pewno chcesz usunąć tego użytkownika?')) return false;

         $scope.users.splice($index, 1);
         // przeslac dane DO API
      };
   }
]);

controllersAdmin.controller('userEdit', [
   '$scope',
   '$http',
   '$routeParams',
   function($scope, $http, $routeParams) {
      $http({
         method: 'POST',
         url: '/model/users.json'
      })
         .then(function(response) {
            var users = response.data;
            $scope.user = users[$routeParams.id];
         })
         .catch(function() {
            console.log('Error');
         });
      $scope.saveChanges = function(user) {
         // przeslac dane DO API

         console.log(user);
         console.log($routeParams.id);
      };
   }
]);

controllersAdmin.controller('userCreate', [
   '$scope',
   '$http',
   function($scope, $http) {
      $scope.createUser = function() {
         console.log($scope.user);
      };
   }
]);

//  =============== ORDERS ==================

controllersAdmin.controller('orders', [
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
         if (!confirm('Czy na pewno chcesz usunąć to zdjęcie')) return false;

         $scope.orders.splice($index, 1);
         // przeslac dane DO API
      };
      $scope.changeStatus = function(order) {
         order.status === 0 ? (order.status = 1) : (order.status = 0);

         console.log(order.status);
      };
   }
]);
