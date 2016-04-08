Meteor.methods({
	postaviPitanje: function(question, urgency, location, id) {
		check(question, String);
		check(urgency, String);
		check(location, String);
		check(id, String);

		Questions.insert({
			userId: this.userId,
			question: question,
			urgency: urgency,
			location: location,
			facebookId: id
		});
	}
});