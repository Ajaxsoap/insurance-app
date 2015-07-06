var pageSession = new ReactiveDict();

Template.Claims.rendered = function() {
	
};

Template.Claims.events({
	
});

Template.Claims.helpers({
	
});

var ClaimsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ClaimsViewSearchString");
	var sortBy = pageSession.get("ClaimsViewSortBy");
	var sortAscending = pageSession.get("ClaimsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["firstName", "lastName", "middleName", "principalBeneficiary", "dateOfLoanRelease", "dateOfLoanMaturity", "dateofBirth", "ageAsOfEnrollment", "maritalStatus", "spouseName", "spouseDateOfBirth", "claimDate", "claimedAmount"];
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

var ClaimsViewExport = function(cursor, fileType) {
	var data = ClaimsViewItems(cursor);
	var exportFields = ["firstName", "lastName", "middleName", "principalBeneficiary", "dateOfLoanRelease", "dateOfLoanMaturity", "dateofBirth", "ageAsOfEnrollment", "maritalStatus", "spouseName", "spouseDateOfBirth", "claimDate", "claimedAmount"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ClaimsView.rendered = function() {
	pageSession.set("ClaimsViewStyle", "table");
	
};

Template.ClaimsView.events({
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
				pageSession.set("ClaimsViewSearchString", searchString);
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
					pageSession.set("ClaimsViewSearchString", searchString);
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
					pageSession.set("ClaimsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("claims.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ClaimsViewExport(this.claims, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ClaimsViewExport(this.claims, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ClaimsViewExport(this.claims, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ClaimsViewExport(this.claims, "json");
	}

	
});

Template.ClaimsView.helpers({

	

	"isEmpty": function() {
		return !this.claims || this.claims.count() == 0;
	},
	"isNotEmpty": function() {
		return this.claims && this.claims.count() > 0;
	},
	"isNotFound": function() {
		return this.claims && pageSession.get("ClaimsViewSearchString") && ClaimsViewItems(this.claims).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ClaimsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ClaimsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ClaimsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ClaimsViewStyle") == "gallery";
	}

	
});


Template.ClaimsViewTable.rendered = function() {
	
};

Template.ClaimsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ClaimsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ClaimsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ClaimsViewSortAscending") || false;
			pageSession.set("ClaimsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ClaimsViewSortAscending", true);
		}
	}
});

Template.ClaimsViewTable.helpers({
	"tableItems": function() {
		return ClaimsViewItems(this.claims);
	}
});


Template.ClaimsViewTableItems.rendered = function() {
	
};

Template.ClaimsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("claims.details", {claimsId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Claims.update({ _id: this._id }, { $set: values });

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
						Claims.remove({ _id: me._id });
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
		Router.go("claims.edit", {claimsId: this._id});
		return false;
	}
});

Template.ClaimsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
