var _ = require('underscore')
var file = require('./1748270655.json');

var LolApi = require('leagueapi');

LolApi.init('f0a8b929-dbf5-402f-b553-89bd0c34b649', 'na');

var matches;

var options = {rankedQueues: ['RANKED_SOLO_5x5']};
LolApi.getMatchHistory(126443, options, 'na', function(err, data){
	console.log(data);
	matches = data;
});

console.log(matches)

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
					locArr.push(participantFrames[wardingPlayer].position)
				}
			});
		}
	});
}

// findPosOfEvents(frames)

// console.log(_.compact(locArr).length);

