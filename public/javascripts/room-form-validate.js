$(function(){

	// if page is the create new room page
	if($('#create-room-page').length){
		$('#submit').prop("disabled",true);
		validName = false;
		validImage = false;
		validDescription = false;
	// if page is the edit room page
	} else {
		$('#submit').prop("disabled",false);
		validName = true;
		validImage = true;
		validDescription = true;
	}

	// called everytime a new entry is changed to valid
	function checkValid() {
		// if both values are valid, enable submit button
		if(validName && validImage && validDescription){
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

	$('#description').keyup(function() { 
		checkDescription();
		checkValid();
	});
	$('#description').blur(function() { 
		checkDescription();
		checkValid();
	});

	function checkDescription(){
		validDescription = false;
		var description = ($("#description").val());
		
		if(!description){
			$('#description').addClass('is-invalid');
			$('#descriptionError').text("Enter a room description.");
		} 
		else {
			$('#description').removeClass('is-invalid');
			$('#descriptionError').text("");
			validDescription = true;
		}
	}

});