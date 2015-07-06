var pageSession = new ReactiveDict();

Template.ClaimsEdit.rendered = function() {
	
};

Template.ClaimsEdit.events({
	
});

Template.ClaimsEdit.helpers({
	
});

Template.ClaimsEditEditForm.rendered = function() {
	

	pageSession.set("claimsEditEditFormInfoMessage", "");
	pageSession.set("claimsEditEditFormErrorMessage", "");

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

Template.ClaimsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("claimsEditEditFormInfoMessage", "");
		pageSession.set("claimsEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var claimsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(claimsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("claimsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("claims", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("claimsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Claims.update({ _id: t.data.claimants._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("claims", {});
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

Template.ClaimsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("claimsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("claimsEditEditFormErrorMessage");
	}
	
});
