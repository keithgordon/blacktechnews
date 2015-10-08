var app = angular.module('blacktechnews', ['ui.router'])
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        });

        $urlRouterProvider.otherwise('home');

      }])
      app.factory('posts', [function(){
        var o = {
          posts: [{title: 'hello', link:'http://blue1647.com', upvotes:3}]
        };
        return o;
      }])
      app.controller('MainCtrl', [
        '$scope',
        'posts',
        function($scope, posts){
          $scope.test = 'Hello world';

          $scope.posts = posts.posts;

          $scope.addPost = function() {
            if($scope.title === '') { return; }
            $scope.posts.push({
              title: $scope.title,
              link: $scope.link,
              upvotes: 0
            });
            $scope.title = '';
            $scope.link = '';
          }

          $scope.incrementUpVotes = function(post){
            post.upvotes += 1;
          }
        }]);
