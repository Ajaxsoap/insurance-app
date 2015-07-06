var pageSession = new ReactiveDict();

Template.EnrollmentsInsert.rendered = function() {
	
};

Template.EnrollmentsInsert.events({
	
});

Template.EnrollmentsInsert.helpers({
	
});

Template.EnrollmentsInsertInsertForm.rendered = function() {
	

	pageSession.set("enrollmentsInsertInsertFormInfoMessage", "");
	pageSession.set("enrollmentsInsertInsertFormErrorMessage", "");

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

Template.EnrollmentsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("enrollmentsInsertInsertFormInfoMessage", "");
		pageSession.set("enrollmentsInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var enrollmentsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(enrollmentsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("enrollmentsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("enrollments", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("enrollmentsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Enrollments.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.EnrollmentsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("enrollmentsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("enrollmentsInsertInsertFormErrorMessage");
	}
	
});
