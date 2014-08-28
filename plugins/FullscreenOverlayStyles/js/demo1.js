(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };
	var linkAbout = document.querySelector('.overlay-about');
	var linkRegister = document.querySelector('.overlay-register');
	var linkSponsor = document.querySelector('.overlay-sponsor');
	var linkGallery = document.querySelector('.overlay-gallery'); 
	var linkSchedule = document.querySelector('.overlay-schedule'); 
	var linkContact = document.querySelector('.overlay-contact'); 


	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', function(e){
		e.preventDefault();
		toggleOverlay();
	});

	linkAbout.addEventListener('click', toggleOverlay);
	linkRegister.addEventListener('click', toggleOverlay);
	linkSponsor.addEventListener('click', toggleOverlay);
	linkGallery.addEventListener('click', toggleOverlay);
	linkSchedule.addEventListener('click', toggleOverlay);
	linkContact.addEventListener('click', toggleOverlay);


	closeBttn.addEventListener( 'click', function(e){
		e.preventDefault();
		toggleOverlay();
	});
})();