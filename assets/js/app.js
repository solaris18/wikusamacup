$(document).ready(function() {
    var windowHeight = $(window).height();
    var homeShouldHeight = $('#home div:eq(0)').height();

    $('.bg-home').css('height', windowHeight);
    $('#home').css({
        'height' : windowHeight, 
        'padding-top' : (windowHeight - homeShouldHeight) / 2
    });
});

// Minimal Form
var theForm = document.getElementById( 'theForm' );

			new stepsForm( theForm, {
				onSubmit : function( form ) {
					// hide form
					classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

					/*
					form.submit()
					or
					AJAX request (maybe show loading indicator while we don't have an answer..)
					*/

					// let's just simulate something...
					var messageEl = theForm.querySelector( '.final-message' );
					messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
					classie.addClass( messageEl, 'show' );
				}
			} );

//Collage Photo
// All images need to be loaded for this plugin to work so
    // we end up waiting for the whole window to load in this example
    $(window).load(function () {
        $(document).ready(function(){
            collage();
            $('.Collage').collageCaption();
        });
    });


    // Here we apply the actual CollagePlus plugin
    function collage() {
        $('.Collage').removeWhitespace().collagePlus(
            {
                'fadeSpeed'     : 2000,
                'targetHeight'  : 200,
                'effect'        : 'effect-1',
                'direction'     : 'vertical'
            }
        );
    };

    // This is just for the case that the browser window is resized
    var resizeTimer = null;
    $(window).bind('resize', function() {
        // hide all the images until we resize them
        $('.Collage .Image_Wrapper').css("opacity", 0);
        // set a timer to re-apply the plugin
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(collage, 200);
    });