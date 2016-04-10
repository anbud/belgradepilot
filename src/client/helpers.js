Template.home.onCreated(function() {
	this.pretraga = new ReactiveVar("");
});

var mape = function() {
	if($("#js-map").html() !== undefined) {
		var loc = Geolocation.latLng();
		var locations = [
	      ['Welcome Refugees - Techfugees Pilot',44.806859, 20.455378],
	['Refugees Aid Barcelona',41.385064, 2.173403],
	['Refugees Welcome - Greece',33.951935, -83.357567],
	['Refugees, welcome to Stuttgart',48.775846, 9.182932],
	['Deaf Refugees Welcome - Hamburg',53.551085, 9.993682],
	['Dear refugees: Welcome to Croatia',45.815011, 15.981919],
	['Refugees, Welcome to Slovenia',46.056947, 14.505751],
	['Refugee Help / Czech Volunteers',50.075538, 14.4378],
	['Refugees, welcome in Slovakia',48.148596, 17.107748],
	['Refugees Welcome to Trieste',45.649526, 13.776818],
	['Refugees Welcome to Portugal',38.722252, -9.139337],
	['Austrian Network for Refugees',48.208174, 16.373819],
	['Jobs for refugees in the Netherlands',52.370216, 4.895168],
	['Refugees Welcome to Sweden',59.329323, 18.068581],
	['Syrian refugees welcome in Bosnia & Herzegovina',43.856259, 18.413076],
	['Refugee Aid in Hungary',47.497912, 19.040235],
	['Community support for refugees in Belgium',50.850340, 4.35171],
	['Refugees Welcome - UK',51.507351, -0.127758]
	    ];

	    var map = new google.maps.Map(document.getElementById('js-map'), {
	      zoom: 10,
	      center: new google.maps.LatLng(loc.lat, loc.lng),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    var infowindow = new google.maps.InfoWindow();

	    var marker, i;

	    for (i = 0; i < locations.length; i++) {  
	      marker = new google.maps.Marker({
	        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	        map: map
	      });

	      google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	          infowindow.setContent(locations[i][0]);
	          infowindow.open(map, marker);
	        }
	      })(marker, i));
	    }
	}
};

Template.home.onRendered(mape);
Template.ask.onRendered(mape);
Template.about.onRendered(mape);
Template.contact.onRendered(mape);
Template.question.onRendered(mape);

Template.question.helpers({
	pitanje_komentari: function() {
		if(Session.get('fbloaded'))
			return nadjiKomentare(Questions.findOne()._id);
		else
			return this.answers;
	},
	pitanje_canVote: function() {
		var self = this;
		var niz = Questions.findOne({
			_id: Template.instance().data._id,
			"answers.id": this.id
		}).answers.filter(it => {
			return it.id === self.id;
		});

		return (niz[0].voters || []).filter(a => {
				if(a.id === Meteor.userId())
					return true

				return false
			}).length === 0;
	},
	pitanje_votes: function() {
		return this.votes || 0;
	},
	pitanje_isUrgent: function() {
		return this.urgency === 2;
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
	
});

Template.ask.helpers({
	home_grad: function() {
		return Session.get('grad');
	},
	home_drzava: function() {
		return Session.get('drzava');
	}
});
