Meteor.publish("claims", function() {
	return Claims.find({}, {});
});

Meteor.publish("claims_empty", function() {
	return Claims.find({_id:null}, {});
});

Meteor.publish("claimants", function(claimsId) {
	return Claims.find({_id:claimsId}, {});
});

