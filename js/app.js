angular
	.module('TTTApp', ['firebase', 'ui.router'])
	.config(MainRouter);

	// To Do: Finish routing
	
	// function MainRouter($stateProvider, $urlRouterProvider){

	// 	$stateProvider
	// 		.state("title", {
	// 			url: "/",
	// 			templateUrl: "title.html"
	// 		})
	// 		.state("home", {
	// 			// needs to have url attribute
	// 			url: "/home",
	// 			// and a template url
	// 			templateUrl: "home.html"
	// 		})
	// 		.state("archive", {
	// 			url: "/archive",
	// 			templateUrl: "archive.html"
	// 		});

	// 	// like "else" in if/else statement, so it goes back home
	// 	$urlRouterProvider.otherwise("/");

	// }