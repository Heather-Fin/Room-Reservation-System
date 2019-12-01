$(function(){

	$('#submit').prop("disabled",true);

	$('#date').change(function(){
		var date = $("#date").val();
		if(date){
			$('#submit').prop("disabled",false);
		} else {
			$('#submit').prop("disabled",true);
		}
	});
	
});