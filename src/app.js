var CricScore = angular.module("CricScore", []);

CricScore.controller("CricScoreController", ["$scope", "CricBuzzService", "MatchService", "XmlToJsonParser", "$q", function($scope, CricBuzzService, MatchService, XmlToJsonParser, $q) {
	CricBuzzService.getData().then(function(data) {
		$scope.matches = [];
		var parser = new DOMParser().parseFromString(data, "text/xml");
		var matches = parser.getElementsByTagName("match");
		var promises = _.map(matches, function(match) {
			var match = new XmlToJsonParser(match);
			return MatchService.getMatchDetails(match).then(function(data) {
				$scope.matches.push(data);
			})
		});
		return $q.when(promises)
			.then(function() {
				return $scope.matches;
			})
	})
}]);
