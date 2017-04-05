angular.module('conference', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.conferences = [];
    $scope.addConference = function() {
      var newconference = {session:$scope.sessionContent,picture:$scope.pictureContent,speaker:$scope.speakerContent,title:$scope.titleContent,upvotes:0};
      $scope.sessionContent='';
      $scope.pictureContent='';
      $scope.speakerContent='';
      $scope.titleContent='';
      $http.post('/conferences', newconference).success(function(data){
        $scope.conferences.push(data);
      });
    };
    $scope.upvote = function(conference) {
      return $http.put('/conferences/' + conference._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          conference.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(conference) {
	  $scope.upvote(conference);
    };
    $scope.getAll = function() {
      return $http.get('/conferences').success(function(data){
        angular.copy(data, $scope.conferences);
      });
    };
    $scope.delete = function(conference) {
      $http.delete('/conferences/' + conference._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
    $scope.getAll();
  }
]);
