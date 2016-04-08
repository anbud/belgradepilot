Questions = new Mongo.Collection("questions");
Sources = new Mongo.Collection("sources");

Questions.attachSchema(QuestionSchema);
Sources.attachSchema(SourceSchema);