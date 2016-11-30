CricScore.service("MatchScoreService",["$http", function($http) {
	this.getScore = function(data) {
		var scoreBoard = {};
		console.log(data);
		scoreBoard.innigs = data.inngsdetail;
		scoreBoard.battingTeam = prepareInnings(data.btTm);
		scoreBoard.bowlingTeam = prepareInnings(data.blgTm);
		return scoreBoard;
	};

	var prepareInnings = function(data) {
		console.log(data,"dfd")
		var team = {};
		team.name = data.sName;
		team.innings = [];
		_.map((data.Inngs.constructor.name == "Array")?data.Inngs:[data.Inngs],function(inningsData) {
				var innings = {};
			  innings.runs = inningsData.r;
			  innings.overs = inningsData.ovrs;
			 innings.wickets = inningsData.wkts;
			 team.innings.push(innings);
		 });
		return team;
	}
}]);
