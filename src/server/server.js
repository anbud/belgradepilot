Meteor.publish('sources', function() {
	return Sources.find({});
});

Meteor.publish('questions', function() {
	return Questions.find({});
})