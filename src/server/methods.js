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
	},
	dodajGrupu: function(name, id, location, city) {
		check(name, String);
		check(location, String);
		check(city, String);
		check(id, String);

		Sources.insert({
			name: name,
			facebookId: id,
			city: city,
			location: location
		});
	},
	sacuvajOdgovore: function(questionId, answers) {
		check(questionId, String);

		answers = answers.map(it => {
			return {
				content: it.message,
				id: it.id,
				from: it.from
			}
		});

		Questions.update({
			_id: questionId
		}, {
			$set: {
				answers: answers
			}
		})
	}
});