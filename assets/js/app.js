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

    $('.btn-menu-box').hide()
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
    $('#schedule .tab-content').children().each(function (i, e) {
        $(e).children().each(function (j, f) {
            var url = 'http://wikucupapi.agunghari.com/schedule/' + $(e).attr('id') + '/' + $(f).attr('data-city');

            $.get(url, function(res) {
                var key, isError, data;

                isError = res.error;
                data = [];

                for (key in res) {
                    if (key === 'error') {
                        continue;
                    }

                    if (res.hasOwnProperty(key)) {
                        data.push({
                            players: res[key].player,
                            time: [
                                res[key].time[0].replace(/ /g, '/'),
                                res[key].time[1]
                            ],
                            currentScore: res[key].currentScore
                        });
                    }
                }

                $(f).liveScore({
                    title: $(f).attr('data-city'),
                    data: data
                }).find('.ls-header').css('background-color', $(f).attr('data-color'));
            });
        });
    });
});

// $(window).load(function() {
//     var $collage = $('.Collage');

//     renderCollage($collage)
//     // $collage.collageCaption();


//     // fancybox
//     $(".fancybox").fancybox(
//     );
// });

$(window).scroll(function() {
    if ($('.btn-menu-box').offset().top > 600) {
        $('.btn-menu-box').fadeIn();
    } else {
        $('.btn-menu-box').fadeOut();
    }
});