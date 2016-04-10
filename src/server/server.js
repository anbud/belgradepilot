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
});

Meteor.publish('answers', function(id) {
	//Dirtiest hack around...
	var odg = new Mongo.Collection('ans');
	var ans = Questions.findOne({
		_id: id
	}).answers;

	odg.remove({});

	for(i = 0; i < ans.length; i++)
		odg.insert(ans[i]);

	return odg.find();
}, {
	url: 'api/question/:0/answers'
})