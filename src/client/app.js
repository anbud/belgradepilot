if(Meteor.isClient) {
	Session.set('fbloaded', false);
	window.fbAsyncInit = function() {
		FB.init({
			appId: '155827621478813',
			status: true,
			xfbml: true,
			version: 'v2.5'
		});

		Session.set('fbloaded', true);
	};
}

	postaviPitanje = function(question, urgency, location) {
		var loc = location.split(",");

		var sourceGrad = Sources.findOne({
			location: loc[0].trim()
		});

		var sourceDrzava = Sources.findOne({
			location: loc[1].trim()
		});

		source = sourceGrad || sourceDrzava;

		var id;

		Meteor.call('postaviPitanje', question, urgency, location, function(err, data) {
			FB.api(
			    (source || '123'/*placeholder */).facebookId + "/feed",
			    "POST",
			    {
			    	access_token: 'CAACNuXIGQZA0BAPFa4zDPkSMcy1ivWqcNRDhvEcVwy3wao2LjrbioDzKthNvzLH8MXZBgdS3ieTnaYaXBb9RTMpL3sl4dBSClmJHReu4N3KItL8GUI7IDXlWXrSvrLtBlllKZBXjlpVBHY4mySTcXZAfy9RQjyMvhjLUfaic24ZBFHnf0zSWL25W5dWSam2IZD',
			    	message: question
			    },
			    function (response) {
			    	if (response && !response.error) {
			    		Meteor.call('postaviId', data, response.id); //latency compensation
			    	}
			    }
			);
		});
	};

	nadjiKomentare = function(questionId) {
		var question = Questions.findOne({
			_id: questionId
		});

		if(question) {
			FB.api(
			    question.facebookId + "/comments",
			    {
			    	access_token: 'CAACNuXIGQZA0BAPFa4zDPkSMcy1ivWqcNRDhvEcVwy3wao2LjrbioDzKthNvzLH8MXZBgdS3ieTnaYaXBb9RTMpL3sl4dBSClmJHReu4N3KItL8GUI7IDXlWXrSvrLtBlllKZBXjlpVBHY4mySTcXZAfy9RQjyMvhjLUfaic24ZBFHnf0zSWL25W5dWSam2IZD'
			    },
			    function (response) {
			    	if (response && !response.error) {
			    		Meteor.call('sacuvajOdgovore', questionId, response.data);
			    	}
			    }
			);

			return question.answers;
		} else {
			return [];
		}
	}

	getLikeCount = function(questionId) {
		var question = Questions.findOne({
			_id: questionId
		});

		if(question) {
			FB.api(
			    question.facebookId + "/likes",
			    {
			    	access_token: 'CAACNuXIGQZA0BAPFa4zDPkSMcy1ivWqcNRDhvEcVwy3wao2LjrbioDzKthNvzLH8MXZBgdS3ieTnaYaXBb9RTMpL3sl4dBSClmJHReu4N3KItL8GUI7IDXlWXrSvrLtBlllKZBXjlpVBHY4mySTcXZAfy9RQjyMvhjLUfaic24ZBFHnf0zSWL25W5dWSam2IZD'
			    },
			    function (response) {
			    	if (response && !response.error) {
			    		Meteor.call('updateLikes', questionId, response.data.length);
			    	}
			    }
			);

			return question.likes || 0;
		} else {
			return 0;
		}
	}

	nadjiLokaciju = function() {
		var loc =  Geolocation.latLng();

		if(loc !== null)
		HTTP.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + ',' + loc.lng + '&sensor=true&key=AIzaSyDKX44QCsQpTwuUN5E7M1h2fGEWu4i25lA', function(err, res) {
			var obj = JSON.parse(res.content).results[0].address_components;
			var drzava = obj.filter(it => { var ok = false; it.types.forEach(l => { if(l === "country") ok = true }); return ok })[0].long_name;
			var grad = obj.filter(it => { var ok = false; it.types.forEach(l => { if(l === "locality") ok = true }); return ok })[0].long_name;
			
			Session.set('drzava', drzava);
			Session.set('grad', grad);
		})
	}

Tracker.autorun(function() {
	nadjiLokaciju();

	if(Session.get('grad') !== undefined || Session.get('drzava') !== undefined) {
		//Meteor.subscribe('questions');

		localforage.setItem('questions-grad', Questions.find({
			location: Session.get('grad')
		}).fetch());

		localforage.setItem('questions-drzava', Questions.find({
			location: Session.get('drzava')
		}).fetch());
	}
})
 