Template.home.events({
	'submit #js-unesiPitanje': function(e, t) {
		e.preventDefault();

		postaviPitanje($("#js-question").val(), $("#js-urgency").val(), $("#js-location").val());
	},
	'keyup #js-search': function(e, t) {
		t.pretraga.set($("#js-search").val());
	}
});