Template.home.onCreated(function() {
	this.pretraga = new ReactiveVar("");
});

Template.question.helpers({
	pitanje_komentari: function() {
		if(Session.get('fbloaded'))
			return nadjiKomentare(Questions.findOne()._id);
		else
			return this.answers;
	},
	pitanje_canVote: function() {
		return Questions.findOne({
			_id: Template.instance().data._id,
			"answers.id": this.id,
			"answers.voters.id": Meteor.userId()
		}) === undefined;
	},
	pitanje_votes: function() {
		return this.votes || 0;
	}
});

Template.home.helpers({
	home_pitanja: function() {
		var s = Session.get('orderBy');
		var f = Session.get('filter');
		var sort;
		var rez;

		if(s === 0)
			sort = {
				date: -1
			}
		else if(s === 1)
			sort = {
				likes: -1
			}
		else
			sort = {
				urgency: -1
			}

		if(Template.instance().pretraga.get() === '')
			rez = Questions.find({}, {
				sort: sort
			});
		else
			rez = Questions.find({
				question: new RegExp(Template.instance().pretraga.get(), "i")
			}, {
				sort: sort
			});

		if(f === 1)
			return rez.fetch().filter(it => {return (it.answers || []).length === 0});

		return rez;
	},
	home_jeOdgovoreno: function() {
		if(Session.get('fbloaded'))
			return (nadjiKomentare(this._id) || []).length > 0;
		else
			return (this.answers || []).length > 0;
	}
})