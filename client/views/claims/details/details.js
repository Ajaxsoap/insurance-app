var pageSession = new ReactiveDict();

Template.ClaimsDetails.rendered = function() {
	
};

Template.ClaimsDetails.events({
	
});

Template.ClaimsDetails.helpers({
	
});

Template.ClaimsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("claimsDetailsDetailsFormInfoMessage", "");
	pageSession.set("claimsDetailsDetailsFormErrorMessage", "");

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

Template.ClaimsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("claimsDetailsDetailsFormInfoMessage", "");
		pageSession.set("claimsDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var claimsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(claimsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("claimsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("claimsDetailsDetailsFormErrorMessage", message);
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

		Router.go("claims", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("claims", {});
	}

	
});

Template.ClaimsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("claimsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("claimsDetailsDetailsFormErrorMessage");
	}
	
});
