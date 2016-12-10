$(document).ready(function(){
	 $('.packageCheck').click(function() {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
        }
    });
	
})