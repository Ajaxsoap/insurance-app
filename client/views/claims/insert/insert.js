var pageSession = new ReactiveDict();

Template.ClaimsInsert.rendered = function() {
	
};

Template.ClaimsInsert.events({
	
});

Template.ClaimsInsert.helpers({
	
});

Template.ClaimsInsertInsertForm.rendered = function() {
	

	pageSession.set("claimsInsertInsertFormInfoMessage", "");
	pageSession.set("claimsInsertInsertFormErrorMessage", "");

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

Template.ClaimsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("claimsInsertInsertFormInfoMessage", "");
		pageSession.set("claimsInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			var claimsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(claimsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("claimsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("claims", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("claimsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Claims.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.ClaimsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("claimsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("claimsInsertInsertFormErrorMessage");
	}
	
});
