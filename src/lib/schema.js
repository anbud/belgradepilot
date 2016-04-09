QuestionSchema = new SimpleSchema({
	question: {
		type: String
	},
	userId: {
		type: String
	},
	facebookId: {
		type: String,
		optional: true
	},
	answers: {
		type: [Object],
		optional: true
	},
	"answers.$.from": {
		type: Object
	},
	"answers.$.from.id": {
		type: String,
		optional: true
	},
	"answers.$.from.name": {
		type: String
	},
	"answers.$.likes": {
		type: Number,
		optional: true
	},
	"answers.$.votes": {
		type: Number,
		optional: true
	},
	"answers.$.voters": {
		type: [Object],
		optional: true
	},
	"answers.$.voters.$.id": {
		type: String
	},
	"answers.$.content": {
		type: String
	},
	"answers.$.id": {
		type: String,
		optional: true
	},
	urgency: {
		type: String,
		optional: true
	},
	location: {
		type: String,
		optional: true
	},
	date: {
		type: Date
	},
	likes: {
		type: Number,
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