Enrollments.allow({
	insert: function (userId, doc) {
		return Enrollments.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Enrollments.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Enrollments.userCanRemove(userId, doc);
	}
});

Enrollments.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Enrollments.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Enrollments.before.remove(function(userId, doc) {
	
});

Enrollments.after.insert(function(userId, doc) {
	
});

Enrollments.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Enrollments.after.remove(function(userId, doc) {
	
});
