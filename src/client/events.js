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
});