$(function(){
	$('#submit').prop("disabled",true);

	validName = false;
	validImage = false;

	// called everytime a new entry is changed to valid
	function checkValid() {
		// if both values are valid, enable submit button
		if(validName && validImage){
			$('#submit').prop("disabled", false);
		} else {
			$('#submit').prop("disabled", true);
		}
	}

	$('#name').keyup(function() { 
		checkName();
		checkValid();
	});
	$('#name').blur(function() { 
		checkName();
		checkValid();
	});

	function checkName(){
		validName = false;
		var name = ($("#name").val());
		
		if(!name){
			$('#name').addClass('is-invalid');
			$('#nameError').text("Enter a room name.");
		} 
		else {
			$('#name').removeClass('is-invalid');
			$('#nameError').text("");
			validName = true;
		}
	}

	$('#image').keyup(function() { 
		checkImage();
		checkValid();
	});
	$('#image').blur(function() { 
		checkImage();
		checkValid();
	});

	function checkImage(){
		validImage = false;
		var image = ($("#image").val());
		
		if(!image){
			$('#image').addClass('is-invalid');
			$('#imageError').text("Enter an image name.");
		} 
		else {
			$('#image').removeClass('is-invalid');
			$('#imageError').text("");
			validImage = true;
		}
	}

});