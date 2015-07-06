this.EnrollmentsDetailsController = RouteController.extend({
	template: "EnrollmentsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("enrollee", this.params.enrollmentId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			enrollee: Enrollments.findOne({_id:this.params.enrollmentId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});