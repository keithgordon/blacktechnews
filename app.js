var app = angular.module('blacktechnews', []);
  app.factory('posts', [function(){
    var o = {
      posts: [{title: 'Blue1647 Expands Internationally', link: 'http://blue1647.com', upvote:0}]
    };
    return o;
  }]);
  app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){
      $scope.test = "Hello world";

      $scope.posts = posts.posts;

      $scope.addPost = function(){
        if($scope.title === '') { return;}
        $scope.posts.push({
          title: $scope.title,
          link: $scope.link,
          upvotes: 0
        });
        $scope.title = '';
        $scope.link = '';
      };

      $scope.incrementUpVotes = function(post){
        post.upvotes += 1;
      };
     }
    ])
