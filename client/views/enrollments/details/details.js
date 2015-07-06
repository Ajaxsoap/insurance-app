var pageSession = new ReactiveDict();

Template.EnrollmentsDetails.rendered = function() {
	
};

Template.EnrollmentsDetails.events({
	
});

Template.EnrollmentsDetails.helpers({
	
});

Template.EnrollmentsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("enrollmentsDetailsDetailsFormInfoMessage", "");
	pageSession.set("enrollmentsDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("input[autofocus]").focus();
};

Template.EnrollmentsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("enrollmentsDetailsDetailsFormInfoMessage", "");
		pageSession.set("enrollmentsDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var enrollmentsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(enrollmentsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("enrollmentsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("enrollmentsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("enrollments", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("enrollments", {});
	}

	
});

Template.EnrollmentsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("enrollmentsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("enrollmentsDetailsDetailsFormErrorMessage");
	}
	
});
