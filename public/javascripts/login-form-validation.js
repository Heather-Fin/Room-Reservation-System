$(function(){

	$('#submit').prop("disabled",true);
	var validUsername = false;
	var validPassword = false;

	// called everytime a new entry is changed to valid
	function checkValid() {
		// if both values are valid, enable submit button
		if(validPassword && validUsername){
			$('#submit').prop("disabled", false);
		} else {
			$('#submit').prop("disabled", true);
		}
	}

	// checks if username already exists and is valid after user leaves the field
	$('#username').keyup(function() { 

		var username   = ($("#username").val()).toLowerCase();
		validUsername = false;

		// if username is left blank
		if(!username){
			$('#username').addClass('is-invalid');
			$('#usernameError').text("Enter your username.");
		}

		// username is valid
		else {
			$('#username').removeClass('is-invalid');
			$('#usernameError').text("");
			validUsername = true;
		}
		checkValid();
    }); 

    // checks if password is valid after user leaves the field
	$('#password').keyup(function() { 

		var password   = $("#password").val();
		validPassword = false;

		// if password is left blank
		if(!password){
			$('#password').addClass('is-invalid');
			$("#passwordError").text("Enter your password.");
		}

		// password is valid
		else {
			$('#password').removeClass('is-invalid');
			$('#passwordError').text("");
			validPassword = true;
		}
		checkValid();
    }); 
});