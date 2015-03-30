var _ = require('underscore');
var Q = require('q');
var file = require('./1748270655.json');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var PosSchema = new Schema({
	x: {
		type: Number
	},
	y: {
		type: Number
	}
});

var myId = 126443;

var PositionModel = mongoose.model('Position', PosSchema);

var LolApi = require('leagueapi');

LolApi.init('f0a8b929-dbf5-402f-b553-89bd0c34b649', 'na');

var matches;

function treeSearchMatches(seedID, levelsDeep){
	if (levelsDeep > 0){
		getFirstMatchID(seedID).then(function(matchID){
			console.log(matchID);
			LolApi.getMatch(matchID, true, 'na', function(err, data){
				findPosOfEvents(data);
				var nextSumonners = _.reject(getListOfSummonerIDs(data), function(player){
					return player.id == seedID;
				});
				console.log(nextSumonners);
			});
		})
	}
}

function getFirstMatchID(summonerID){
	var deferred = Q.defer();
	var options = {rankedQueues: ['RANKED_SOLO_5x5']};
	LolApi.getMatchHistory(summonerID, options, 'na', function(err, data){
		deferred.resolve(data.matches[0].matchId);
	});
	return deferred.promise;
}

function getListOfSummonerIDs(match) {
	var summonerIDs = []

	match.participantIdentities.forEach(function(player){
		var temp = {
			name: player.player.summonerName,
			id: player.player.summonerId
		}
		summonerIDs.push(temp)
		
	});
	return summonerIDs;
}

treeSearchMatches(myId, 1);

function findPosOfEvents(match) {
	var frames = match.timeline.frames
	frames.forEach(function(frame){
		var events = frame.events;
		var participantFrames = frame.participantFrames;
		if (events){
			events.forEach(function(event){
				if (event.eventType == 'WARD_PLACED'){
					var wardingPlayer = event.creatorId;
					var pos = participantFrames[wardingPlayer].position;
					console.log(pos);

					var posEntry = new PositionModel({
						x: pos.x,
						y: pos.y
					});

					// posEntry.save(function(err){
					// 	if (err) {
					// 		console.log(err);
					// 	} else {
					// 		// return console.log('saved');
					// 	}
					// });
		}
	});
		}
	});
}

// findPosOfEvents(frames)
// getPositionFromMatch(1750903595);


