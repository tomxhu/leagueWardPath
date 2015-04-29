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
	},
	timestamp: {
		type: Number
	}
});

var myId = 126443;

var PositionModel = mongoose.model('Position', PosSchema);

var LolApi = require('leagueapi');

LolApi.init('f0a8b929-dbf5-402f-b553-89bd0c34b649', 'na');

var matches;


// returns the first match that a specific summoner has participated in
function getFirstMatchID(summonerID){
	console.log(summonerID);
	var deferred = Q.defer();
	var options = {rankedQueues: ['RANKED_SOLO_5x5']};
	LolApi.getMatchHistory(summonerID, options, 'na', function(err, data){
		var result = 0;
		if (data && data.matches[5]){
			result = data.matches[5].matchId
		}
		deferred.resolve(result);
	});
	return deferred.promise;
}

// returns a list of the summoners that participated in the match
function getListOfSummonerIDs(match) {
	var deferred = Q.defer();
	console.log("getListOfSummonerIDs")
	var summonerIDs = []
	if (match) {
		match.participantIdentities.forEach(function(player){
		var temp = {
			name: player.player.summonerName,
			id: player.player.summonerId
		}
		summonerIDs.push(temp)
		
	});
	}
	deferred.resolve(summonerIDs);
	return deferred.promise;
}

// find the position events for the match data that is returned
function findPosOfEvents(match) {
	var deferred = Q.defer();
	console.log('running find pos')
	if (match) {
		var frames = match.timeline.frames
	frames.forEach(function(frame){
		var events = frame.events;
		var timestamp = frame.timestamp;
		var participantFrames = frame.participantFrames;
		if (events){
			events.forEach(function(event){
				if (event.eventType == 'WARD_PLACED'){
					var wardingPlayer = event.creatorId;
					var pos = participantFrames[wardingPlayer].position;
					if (pos) {
						var posEntry = new PositionModel({
							x: pos.x,
							y: pos.y,
							timestamp: timestamp
						});

						posEntry.save(function(err){
						if (err) {
							console.log(err);
						} else {
							// return console.log('saved');
						}
					});
					}
					

					
		}
	});
		}
	});
	}
	deferred.resolve(console.log('done finding pos'));
	return deferred.promise;
}

// take a summonerid, find a match, extract positions and then return a list of the summoners in the game
function takeSummonerIDAndFindPosAndReturnListOfNext(summonerID) {
	var deferred = Q.defer()
	
	LolApi.getMatchHistory(summonerID, 'na', function(err, result){
		if (result) {
			LolApi.getMatch(result.matches[8].matchId, true, 'na', function(err, data){
			findPosOfEvents(data).then(function(){
				getListOfSummonerIDs(data).then(function(list){
					var nextSumonners = _.reject(list, function(player){
						return player.id == summonerID;
					});
					deferred.resolve(nextSumonners);
				});
				
			});
		})

		}
		
	});

	return deferred.promise;
}

// running it

takeSummonerIDAndFindPosAndReturnListOfNext(45411179).then(function(summonerIDs){

			console.log(summonerIDs);
			return
		});