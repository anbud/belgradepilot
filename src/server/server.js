Meteor.publish('sources', function() {
	return Sources.find({});
}, {
	url: 'api/sources'
});

Meteor.publish('questions', function() {
	return Questions.find({});
}, {
	url: 'api/questions'
});

Meteor.publish('question', function(id) {
	return Questions.find({
		_id: id
	});
}, {
	url: 'api/question/:0'
})