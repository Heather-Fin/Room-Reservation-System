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

	// makes an AJAX call to see if the username is already taken
    function usernameExists(username){
    	var exists = false;

    	$.ajax({
            url: "/register/checkUsername",
            method: "POST",
            data: {
			    username: username
			},
			success: function(response) {
			    // username already exists
			    if(response.result == 'exists'){
			    	validUsername = false;
			    	$('#username').addClass('is-invalid');
					$('#usernameError').text("Username is already taken.");
					checkValid();
			    }
			}
		});
    }

	// checks if username already exists and is valid after user leaves the field
	$('#username').keyup(function() { 

		var username   = ($("#username").val()).toLowerCase();
		validUsername = false;

		var reg=/[^a-z0-9]+/;

		// if username is left blank
		if(!username){
			$('#username').addClass('is-invalid');
			$('#usernameError').text("Username required.");
		// if username is too short
		} else if (username.length < 4){
			$('#username').addClass('is-invalid');
			$('#usernameError').text("Username must be atleast 4 characters long.");
		// if username is not only letters and numbers
		} else if (reg.test(username)){
			$('#username').addClass('is-invalid');
			$('#usernameError').text("Username may only contain letters and numbers.");
		// if username is taken
		} else if (usernameExists(username)){
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

		var reg=/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&]{6,}$/;
		var regSymbols=/[^a-z\d@$!%*#?&]/;

		// if password is left blank
		if(!password){
			$('#password').addClass('is-invalid');
			$("#passwordError").text("Password required.");
		// if password is too short
		} else if (password.length < 6){
			$('#password').addClass('is-invalid');
			$('#passwordError').text("Password must be atleast 6 characters long.");
		// make sure password only contains valid characters
		} else if (regSymbols.test(password)){
			$('#password').addClass('is-invalid');
			$("#passwordError").text("Password may only contain letters, numbers, and the follwoing symbols: @$!%*#?&");
		// if password is not strong enough
		} else if (!reg.test(password)){
			$('#password').addClass('is-invalid');
			$("#passwordError").text("Password must contain atleast one number, one letter, and one symbol.");
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