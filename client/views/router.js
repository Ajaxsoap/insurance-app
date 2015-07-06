Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var freeRoutes = [
	"home",
	"enrollments",
	"enrollments.insert",
	"enrollments.details",
	"enrollments.edit",
	"claims",
	"claims.insert",
	"claims.details",
	"claims.edit"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("enrollments", {path: "/enrollments", controller: "EnrollmentsController"});
	this.route("enrollments.insert", {path: "/enrollments/insert", controller: "EnrollmentsInsertController"});
	this.route("enrollments.details", {path: "/enrollments/details/:enrollmentId", controller: "EnrollmentsDetailsController"});
	this.route("enrollments.edit", {path: "/enrollments/edit/:enrollmentId", controller: "EnrollmentsEditController"});
	this.route("claims", {path: "/claims", controller: "ClaimsController"});
	this.route("claims.insert", {path: "/claims/insert", controller: "ClaimsInsertController"});
	this.route("claims.details", {path: "/claims/details/:claimsId", controller: "ClaimsDetailsController"});
	this.route("claims.edit", {path: "/claims/edit/:claimsId", controller: "ClaimsEditController"});
});
