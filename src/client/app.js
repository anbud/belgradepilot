if(Meteor.isClient) {
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
		var source = Sources.findOne({
			location: location
		});

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