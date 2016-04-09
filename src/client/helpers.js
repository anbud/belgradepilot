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
		if(Template.instance().pretraga.get() === '')
			return Questions.find();
		else
			return Questions.find({
				question: new RegExp(Template.instance().pretraga.get(), "i")
			});
	},
	home_jeOdgovoreno: function() {
		if(Session.get('fbloaded'))
			return nadjiKomentare(this._id).length > 0;
		else
			return this.answers.length > 0;
	}
})