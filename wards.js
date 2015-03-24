var _ = require('underscore')
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

var PositionModel = mongoose.model('Position', PosSchema);

var LolApi = require('leagueapi');

LolApi.init('f0a8b929-dbf5-402f-b553-89bd0c34b649', 'na');

var matches;

var options = {rankedQueues: ['RANKED_SOLO_5x5']};
LolApi.getMatchHistory(126443, options, 'na', function(err, data){
	data.matches.forEach(function(match){

	});
});



function getPositionFromMatch(matchID){
	LolApi.getMatch(matchID, true, 'na', function(err, data){
		findPosOfEvents(data.timeline.frames);
	});
}



//var frames = file.timeline.frames;

var locArr = [];

function findPosOfEvents(frames) {
	frames.forEach(function(frame){
		var events = frame.events;
		var participantFrames = frame.participantFrames;
		if (events){
			events.forEach(function(event){
				if (event.eventType == 'WARD_PLACED'){
					var wardingPlayer = event.creatorId;
					var pos = participantFrames[wardingPlayer].position;
					console.log(pos.x);

					var posEntry = new PositionModel({
						x: pos.x,
						y: pos.y
					});

					posEntry.save(function(err){
						if (err) {
							console.log(err);
						} else {
							return console.log('saved');
						}
					});
				}
			});
		}
	});
}

// findPosOfEvents(frames)
getPositionFromMatch(1750903595);


