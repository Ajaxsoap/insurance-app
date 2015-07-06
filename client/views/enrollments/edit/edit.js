var pageSession = new ReactiveDict();

Template.EnrollmentsEdit.rendered = function() {
	
};

Template.EnrollmentsEdit.events({
	
});

Template.EnrollmentsEdit.helpers({
	
});

Template.EnrollmentsEditEditForm.rendered = function() {
	

	pageSession.set("enrollmentsEditEditFormInfoMessage", "");
	pageSession.set("enrollmentsEditEditFormErrorMessage", "");

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

Template.EnrollmentsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("enrollmentsEditEditFormInfoMessage", "");
		pageSession.set("enrollmentsEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var enrollmentsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(enrollmentsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("enrollmentsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("enrollments", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("enrollmentsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Enrollments.update({ _id: t.data.enrollee._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("enrollments", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EnrollmentsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("enrollmentsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("enrollmentsEditEditFormErrorMessage");
	}
	
});
