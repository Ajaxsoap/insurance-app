var pageSession = new ReactiveDict();

Template.Enrollments.rendered = function() {

};

Template.Enrollments.events({

});

Template.Enrollments.helpers({

});

var EnrollmentsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EnrollmentsViewSearchString");
	var sortBy = pageSession.get("EnrollmentsViewSortBy");
	var sortAscending = pageSession.get("EnrollmentsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["firstName", "lastName", "middleName", "principalBeneficiary", "dateOfLoanRelease", "dateOfLoanMaturity", "dateofBirth", "ageAsOfEnrollment", "maritalStatus", "spouseName", "spouseDateOfBirth"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var EnrollmentsViewExport = function(cursor, fileType) {
	var data = EnrollmentsViewItems(cursor);
	var exportFields = ["firstName", "lastName", "middleName", "principalBeneficiary", "dateOfLoanRelease", "dateOfLoanMaturity", "dateofBirth", "ageAsOfEnrollment", "maritalStatus", "spouseName", "spouseDateOfBirth"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.EnrollmentsView.rendered = function() {
	pageSession.set("EnrollmentsViewStyle", "table");

};

Template.EnrollmentsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("EnrollmentsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("EnrollmentsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("EnrollmentsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("enrollments.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EnrollmentsViewExport(this.enrollments, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EnrollmentsViewExport(this.enrollments, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EnrollmentsViewExport(this.enrollments, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EnrollmentsViewExport(this.enrollments, "json");
	}


});

Template.EnrollmentsView.helpers({



	"isEmpty": function() {
		return !this.enrollments || this.enrollments.count() == 0;
	},
	"isNotEmpty": function() {
		return this.enrollments && this.enrollments.count() > 0;
	},
	"isNotFound": function() {
		return this.enrollments && pageSession.get("EnrollmentsViewSearchString") && EnrollmentsViewItems(this.enrollments).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EnrollmentsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EnrollmentsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EnrollmentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EnrollmentsViewStyle") == "gallery";
	}


});


Template.EnrollmentsViewTable.rendered = function() {

};

Template.EnrollmentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EnrollmentsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EnrollmentsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EnrollmentsViewSortAscending") || false;
			pageSession.set("EnrollmentsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("EnrollmentsViewSortAscending", true);
		}
	}
});

Template.EnrollmentsViewTable.helpers({
	"tableItems": function() {
		return EnrollmentsViewItems(this.enrollments);
	}
});


Template.EnrollmentsViewTableItems.rendered = function() {

};

Template.EnrollmentsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("enrollments.details", {enrollmentId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Enrollments.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Enrollments.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("enrollments.edit", {enrollmentId: this._id});
		return false;
	},
	"click #claims-button": function(e, t) {
		e.preventDefault();
		Router.go("claims.insert", {enrollmentId: this._id});
		return false;
	}
});

Template.EnrollmentsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }



});
