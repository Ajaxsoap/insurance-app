Meteor.publish("enrollments", function() {
	return Enrollments.find({}, {});
});

Meteor.publish("enrollments_empty", function() {
	return Enrollments.find({_id:null}, {});
});

Meteor.publish("enrollee", function(enrollmentId) {
	return Enrollments.find({_id:enrollmentId}, {});
});

