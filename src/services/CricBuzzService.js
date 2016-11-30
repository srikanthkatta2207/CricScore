CricScore.service("CricBuzzService", ["$http", function($http) {
	this.getData = function() {
		var successPromise = function(response) {
			return response.data;
		};

		var failurePromise = function(data) {
			console.log(data);
		};

		return $http.get("/livematchdata")
			.then(successPromise, failurePromise);
	};
}]);
