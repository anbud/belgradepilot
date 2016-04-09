Meteor.methods({
	postaviPitanje: function(question, urgency, location) {
		check(question, String);
		check(urgency, String);
		check(location, String);

		return Questions.insert({
			userId: this.userId,
			question: question,
			urgency: urgency,
			location: location,
			date: new Date()
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

		answers = _.union(answers, Questions.findOne(questionId).answers);

		Questions.update({
			_id: questionId
		}, {
			$set: {
				answers: answers
			}
		})
	},
	updateLikes: function(questionId, likeCount) {
		check(questionId, String);
		check(likeCount, Number);

		Questions.update({
			_id: questionId
		}, {
			$set: {
				likes: likeCount
			}
		})
	},
	dodajOdgovor: function(questionId, content, name) {
		check(questionId, String);
		check(content, String);
		check(name, String);

		Questions.update({
			_id: questionId
		}, {
			$push: {
				answers: {
					content: content,
					id: Random.id(12),
					from: {
						name: name
					}
				}
			}
		});
	},
	upvoteComment: function(questionId, commentId) {
		check(questionId, String);
		check(commentId, String);

		if(!Questions.findOne({
			_id: questionId,
			"answers.id": commentId,
			"answers.voters.id": this.userId
		})) {
			var votes = Questions.findOne({
				_id: questionId,
				"answers.id": commentId
			}).answers.filter(it => {
				return it.id === commentId
			})[0].votes || 0;

			Questions.update({
				_id: questionId,
				"answers.id": commentId
			}, {
				$set: {
					"answers.$.votes": votes+1 
				},
				$push: {
					"answers.$.voters": {
						id: this.userId
					}
				}
			});
		}
	},
	downvoteComment: function(questionId, commentId) {
		check(questionId, String);
		check(commentId, String);

		if(!Questions.findOne({
			_id: questionId,
			"answers.id": commentId,
			"answers.voters.id": this.userId
		})) {
			var votes = Questions.findOne({
				_id: questionId,
				"answers.id": commentId
			}).answers.filter(it => {
				return it.id === commentId
			})[0].votes || 0;

			Questions.update({
				_id: questionId,
				"answers.id": commentId
			}, {
				$set: {
					"answers.$.votes": votes-1 
				},
				$push: {
					"answers.$.voters": {
						id: this.userId
					}
				}
			});
		}
	}
});