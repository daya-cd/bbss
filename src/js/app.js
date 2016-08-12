var user = require('./module/user');



window.jQuery = window.$ = require("jquery");

$(document).ready(function() {
	$('#userName').text(user('user name'));
	console.log(user('user name'));
});
