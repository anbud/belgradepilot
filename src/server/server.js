Meteor.publish('sources', function() {
	return Sources.find({});
});

Meteor.publish('questions', function() {
	return Questions.find({});
});

Meteor.publish('question', function(id) {
	return Questions.find({
		_id: id
	});
})