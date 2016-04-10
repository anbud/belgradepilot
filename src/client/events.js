Template.home.events({
	'submit #js-unesiPitanje': function(e, t) {
		e.preventDefault();

		postaviPitanje($("#js-question").val(), $("#js-urgency").val(), $("#js-location").val());
	},
	'keyup #js-search': function(e, t) {
		t.pretraga.set($("#js-search").val());
	},
	'click #js-popular': function(e, t) {
		Session.set('orderBy', 1)
	},
	'click #js-recent': function(e, t) {
		Session.set('orderBy', 0)
	},
	'click #js-urgency': function(e, t) {
		Session.set('orderBy', 2)
	},
	'click #js-unanswered': function(e, t) {
		Session.set('filter', Session.get('filter') === 1 ? 0 : 1)
	}
});

Template.ask.events({
	'submit #js-unesiPitanje': function(e, t) {
		e.preventDefault();

		postaviPitanje($("#js-question").val(), $("#js-urgency").val(), $("#js-location").val());

		$("#js-poruka").html("Posting to Facebook...");
	}
});

Template.question.events({
	'submit #js-odgovori': function(e, t) {
		e.preventDefault();

		Meteor.call('dodajOdgovor', this._id, $("#js-ime").val(), $("#js-odgovor").val(), function(err, data) {});

		$("#js-odgovoriDiv").hide();
	},
	'click #js-upvote': function(e, t) {
		Meteor.call('upvoteComment', t.data._id, this.id);
	},
	'click #js-downvote': function(e, t) {
		Meteor.call('downvoteComment', t.data._id, this.id);
	}
});

Template.contact.events({
	'submit #js-contact': function(e, t) {
		e.preventDefault();

		if($("#js-email").val() !== '' && $("#js-name").val() !== '' && $("#js-subject").val() !== '' && $("#js-text").val() !== '') {
			$("#js-poruka").html("Sending email...");

			Meteor.call('sendEmail', $("#js-email").val(), 'belgradepilot@gmail.com', $("#js-subject").val(), $("#js-text").val(), function(err, data) {
				$("#js-poruka").html("Mail sent successfully!");
			})
		} else {
			$("#js-poruka").html("All fields must filled!");
		}
	}
})