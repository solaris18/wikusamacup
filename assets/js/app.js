function renderCollage($collage) {
    $collage.removeWhitespace().collagePlus({
        'fadeSpeed' : 2000,
        'targetHeight' : 200,
        'effect' : 'effect-1',
        'direction' : 'vertical'
    });
}

$(document).ready(function() {
    var apiUrl = 'http://wikusamacup.local';
    var windowHeight = $(window).height();
    var homeShouldHeight = $('#home div:eq(0)').height();
    var resizeTimer = null;
    var $collage = $('.Collage');

    $('.bg-home').css('height', windowHeight);
    $('#home').css({
        'height' : windowHeight, 
        'padding-top' : (windowHeight - homeShouldHeight) / 2
    });

    $('#sidemenu .menu a').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        var $target = $($this.attr('href'));

        $('html, body').animate({
            scrollTop: $target.offset().top
        }, 500);
    });

    (function(form) {
        new stepsForm(form, {
            onSubmit: function(form) {
                // alert(form.serialize());
                $.ajax({
                    url: apiUrl + "/registration",
                    type: "post",
                    data: $(form).serialize(),
                    success: function( result ){
                      if ( ! result.error ) {
                        classie.addClass(form.querySelector('.simform-inner'), 'hide');
                        var messageEl = form.querySelector('.final-message');
                        messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
                        classie.addClass( messageEl, 'show' );
                      }else{
                        alert('Something problem please try again!');
                      };
                    }
                });

            }
        });
    } ($('#theForm').get(0)));

    $(window).bind('resize', function() {
        $collage.find('.Image_Wrapper').css("opacity", 0);
        
        if (resizeTimer) clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function() {
            renderCollage($collage);
        }, 200);
    });
});

$(window).load(function() {
    var $collage = $('.Collage');

    renderCollage($collage)
    // $collage.collageCaption();


    // fancybox
    $(".fancybox").fancybox(
    );
});