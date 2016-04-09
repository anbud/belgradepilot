Template.home.events({
	'submit #js-unesiPitanje': function(e, t) {
		e.preventDefault();

		postaviPitanje($("#js-question").val(), $("#js-urgency").val(), $("#js-location").val());
	}
});