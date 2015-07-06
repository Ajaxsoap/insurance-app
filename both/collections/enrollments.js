this.Enrollments = new Mongo.Collection("enrollments");

this.Enrollments.userCanInsert = function(userId, doc) {
	return true;
}

this.Enrollments.userCanUpdate = function(userId, doc) {
	return true;
}

this.Enrollments.userCanRemove = function(userId, doc) {
	return true;
}
