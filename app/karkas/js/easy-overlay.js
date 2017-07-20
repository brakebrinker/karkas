(function( $ ){
	$.fn.overlay = function() {
    	var $t = $(this);
		
		if($t.length <= 0) return;
		
	  	var vzIndex;
	  	if($t.css('z-index') == "auto") vzIndex = "11";
	  	else vzIndex = parseFloat($t.css('z-index')) + 1;
		
		if( !$("#jqueryEasyOverlayDiv").length ) {
			var innerDiv = document.createElement('div');
			$(innerDiv).css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                'margin-top': '-44px',
                'margin-left': '-40px',
                'font-size': '40px',
                color: '#fff'
            }).attr("id", "jqueryOverlayLoad").html("<i class='fa fa-spin fa-spinner fa-2x'></i>&nbsp;");
			
			var div = document.createElement('div');	
			$(div).css({
				display: "none",
				position: "absolute",
				background: "#eee"
			}).attr('id',"jqueryEasyOverlayDiv").append(innerDiv);
			
			$("body").append(div);
		}
		
	  	$("#jqueryEasyOverlayDiv").css({
            position: 'fixed',
		  	zIndex  : vzIndex,
		  	top     : '0px',
		  	left    : '0px',
		  	width   : '100%',
		  	height  : '100%',
            background: 'rgba(0, 0, 0, 0.62)'
		});
		
		var topOverlay = (($t.height()/2)-24);
		if(topOverlay < 0) topOverlay = 0;
		
		$("#jqueryEasyOverlayDiv").fadeIn();
   	}; 
})(jQuery);

(function( $ ){
	$.fn.overlayout = function() {
		if( $("#jqueryEasyOverlayDiv").length ) $("#jqueryEasyOverlayDiv").fadeOut();
		
   }; 
})(jQuery);

(function( $ ){
	$.overlayout = function() {
		if( $("#jqueryEasyOverlayDiv").length ) $("#jqueryEasyOverlayDiv").fadeOut();
		
   }; 
})(jQuery);