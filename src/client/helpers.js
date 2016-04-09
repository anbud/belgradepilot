Template.home.onCreated(function() {
	this.pretraga = new ReactiveVar("");
});

Template.question.helpers({
	pitanje_komentari: function() {
		if(Session.get('fbloaded'))
			return nadjiKomentare(Questions.findOne()._id);
		else
			return [];
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
	}
})