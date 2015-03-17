var _ = require('./underscore');
var file = require('./1748270655.json');

// gets each frame of the event
//console.log(file.timeline.frames[15]);

// console.log(file.timeline.frames[15].events);

var frames = file.timeline.frames;

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

findPosOfEvents(frames)

console.log(locArr.length);

