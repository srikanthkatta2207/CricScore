CricScore.service("MatchService", ["$http", "MatchScoreService", "$q", function($http, MatchScoreService, $q) {

	var getMatchState = function(data) {
		var matchState = {};
		matchState.mchState = data.mchState;
		matchState.status = data.status;
		return matchState;
	};

	var isMatchStarted = function(data) {
		console.log(data)
		return (data == "preview" || data == "Result" )? true : false;
	};

	var getStartTime = function(data) {
		return data.stTme + data.Dt;
	};

	this.getMatchDetails = function(match) {
		var matchData = {};
		matchData.type = match.type;
		matchData.mchDesc = match.mchDesc;
		matchData.grnd = match.grnd;
		matchData.state = getMatchState(match.state);
		var matchStarted = isMatchStarted(match.state.mchState);
		if(matchStarted) {
			matchData.startTime = getStartTime(match.Tme);
			return $q.when(matchData);
		}
		matchData.score = MatchScoreService.getScore(match.mscr);
		return $q.when(matchData);
	}
}]);
