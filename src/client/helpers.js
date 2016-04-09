Template.home.onCreated(function() {
	this.pretraga = new ReactiveVar("");
});

Template.question.helpers({
	pitanje_komentari: function() {
		if(Session.get('fbloaded'))
			return nadjiKomentare(Questions.findOne()._id);
		else
			return this.answers;
	}
});

Template.home.helpers({
	home_pitanja: function() {
		var s = Session.get('orderBy');
		var sort;

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
			return Questions.find({}, {
				sort: sort
			});
		else
			return Questions.find({
				question: new RegExp(Template.instance().pretraga.get(), "i")
			}, {
				sort: sort
			});
	},
	home_jeOdgovoreno: function() {
		if(Session.get('fbloaded'))
			return (nadjiKomentare(this._id) || []).length > 0;
		else
			return (this.answers || []).length > 0;
	}
})