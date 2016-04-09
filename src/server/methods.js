Meteor.methods({
	postaviPitanje: function(question, urgency, location) {
		check(question, String);
		check(urgency, String);
		check(location, String);

		return Questions.insert({
			userId: this.userId,
			question: question,
			urgency: urgency,
			location: location
		});
	},
	postaviId: function(questionId, facebookId) {
		check(questionId, String);
		check(facebookId, String);

		Questions.update({
			_id: questionId
		}, {
			$set: {
				facebookId: facebookId
			}
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
				from: {
					name: it.from.name,
					id: it.from.id
				}
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