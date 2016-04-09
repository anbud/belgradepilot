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
		return Questions.find();
	}
})