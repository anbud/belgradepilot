if(Meteor.isClient) {
	window.fbAsyncInit = function() {
		FB.init({
			appId: '155827621478813',
			status: true,
			xfbml: true,
			version: 'v2.5'
		});
	};

	postaviPitanje = function(question, urgency, location) {
		var source = Sources.findOne({
			location: location
		});

		if(source) {
			FB.api(
			    source.facebookId + "/feed",
			    "POST",
			    {
			    	access_token: 'CAACNuXIGQZA0BAPFa4zDPkSMcy1ivWqcNRDhvEcVwy3wao2LjrbioDzKthNvzLH8MXZBgdS3ieTnaYaXBb9RTMpL3sl4dBSClmJHReu4N3KItL8GUI7IDXlWXrSvrLtBlllKZBXjlpVBHY4mySTcXZAfy9RQjyMvhjLUfaic24ZBFHnf0zSWL25W5dWSam2IZD',
			    	message: question
			    },
			    function (response) {
			    	if (response && !response.error) {
			    		Meteor.call('postaviPitanje', question, urgency, location, repsonse.id);
			    		//yay, postavio sam pitanje :D
			    	}
			    }
			);
		}
	}
}