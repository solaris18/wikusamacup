// Declaration variable
var apiUrl = 'http://wikucupapi.agunghari.com';

function renderCollage($collage) {
    $collage.removeWhitespace().collagePlus({
        'fadeSpeed' : 2000,
        'targetHeight' : 200,
        'effect' : 'effect-1',
        'direction' : 'vertical'
    });
}

$(document).ready(function() {
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
                        messageEl.innerHTML = 'Thank you, please check your email.';
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
    function render() {
        $('#schedule .tab-content').children().each(function (i, e) {
            $(e).children().each(function (j, f) {
                var url = apiUrl + '/schedule/' + $(e).attr('id') + '/' + $(f).attr('data-city');

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

                    $(f).html('');
                    $(f).liveScore({
                        title: $(f).attr('data-city'),
                        data: data
                    });
                    $(f).find('.ls-header').css('background-color', $(f).attr('data-color'));
                });
            });
        });
    }

    function renderLiveScore( liveCity, liveCategory, init ){
      var url = apiUrl + '/schedule/' + liveCity + '/' + liveCategory + '/live';
      $.get( url, function(res){
        var isError = res.error;
        if( ! isError ){
          if ( res.player ) {
            $('#team-a').html( res.player[0] + '<span class="text-xxlarge">' + res.currentScore[0] + '</span>');
            $('#team-b').html( res.player[1] + '<span class="text-xxlarge">' + res.currentScore[1] + '</span>');
            $('#live-date').html( res.time[0] );
            $('#live-time').html( res.time[1] );
            if ( 'malang' == liveCity ) {
              $('#live-place').html( 'CHAMPION MATOS' );
              $('#live-city').html( 'Klojen, Malang' );
            }else{
              $('#live-place').html( 'GOR SENEN' );
              $('#live-city').html( 'Jakarta Pusat' );
            }
            return true;
          }else{
            if( ! init )
              alert('Mohon maaf pada regional ' + liveCity + ' tidak berlangsung pertandingan ' + liveCategory);
              return false;
          }
        }
      });
    }

    function renderComment(){
      var url = apiUrl + '/comment';
      $.get( url, function(res){
        var isError = res.error;
        var data = res.data;
        if( ! isError ){
          $.each(data, function( index, value ) {

            var ret, $inner, $author, $grade;
            var classHtml = ( index == 0 ) ? 'item active' : 'item';
            $inner = jQuery('<p />').html( value.comment + '<br><br>' );

            $author = jQuery('<span />').addClass( 'author' ).html( '~ ' + value.name );
            $author.appendTo( $inner );

            $grade = jQuery('<span />').addClass( 'grade' ).html( '~ ' + value.generation );
            $grade.appendTo( $inner );

            ret = jQuery('<div />').addClass(classHtml).html( $inner );

            ret.appendTo( '.carousel-inner' );
          });
        }
      });
    }

    renderLiveScore( 'jakarta', 'futsal', true );
    render();
    renderComment();

    $( '.pickcity' ).change( function(){
      var liveCity = $(this).val();
      var liveCategory = $( '.category .active' ).attr( 'data-category' );
      renderLiveScore( liveCity, liveCategory, false );
      return false;
    });

    $( '.category input' ).click( function(){
      var liveCity = $( '.pickcity' ).val();
      var liveCategory = $(this).attr( 'data-category' );
      var changelivescor = renderLiveScore( liveCity, liveCategory, false );
      if ( changelivescor ) {
        $( '.category .active' ).removeClass( 'active' );
        $( this ).addClass( 'active' );
      }
      return false;
    });

    setInterval(function () {
      var liveCity = $( '.pickcity' ).val();
      var liveCategory = $( '.category .active' ).attr( 'data-category' );
      render();
      renderLiveScore( liveCity, liveCategory, true );
    }, 1000 * 60);
});

$(window).load(function() {
    var $collage = $('.Collage');

    renderCollage($collage)
    // $collage.collageCaption();


    // fancybox
    $(".fancybox").fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
});

$(window).scroll(function() {
    if ($('.btn-menu-box').offset().top > 600) {
        $('.btn-menu-box').fadeIn();
    } else {
        $('.btn-menu-box').fadeOut();
    }
});
