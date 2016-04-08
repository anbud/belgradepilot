QuestionSchema = new SimpleSchema({
	question: {
		type: String
	},
	userId: {
		type: String
	},
	facebookId: {
		type: String
	},
	answers: {
		type: [Object],
		optional: true
	},
	"answers.$.name": {
		type: String
	},
	"answers.$.likes": {
		type: Number
	},
	"answers.$.content": {
		type: String
	},
	"answers.$.id": {
		type: String
	},
	urgency: {
		type: String,
		optional: true
	},
	location: {
		type: String,
		optional: true
	}
});

SourceSchema = new SimpleSchema({
	name: {
		type: String
	},
	facebookId: {
		type: String
	},
	location: {
		type: String,
		optional: true
	},
	city: {
		type: String,
		optional: true
	}
})