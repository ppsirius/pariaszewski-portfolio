document.addEventListener("DOMContentLoaded", function() {
  document.body.style.opacity = '1';

  // Media query listener
  var mediaQuery = window.matchMedia("(min-width: 1024px)");
  mediaQuery.addListener(runOnDesktop);
  runOnDesktop(mediaQuery);

  // Run functions over 1024px
  function runOnDesktop(media) {
    if(media.matches) {
      alignSocial();
      sliderChange();
    }
  }

  function sliderChange() {
    var sliderAbout = document.querySelector('.slider-about'),
        sliderAboutSpans = sliderAbout.querySelectorAll('.slider-span'),
        sliderInfo = document.querySelector('.slider-info'),
        sliderInfoSpans = sliderInfo.querySelectorAll('.slider-span'),
        sliderButton = document.querySelector('#slider-button'),
        activeAbout = true,
        motionIsFinished = true,
        counter;

    function translateElement(element, translate) {
      for(counter = 0; counter < element.length; counter++ ) {
        element[counter].style.transform = translate;
      }
    }

    translateElement(sliderInfoSpans, 'translateY(-25px)');

    // Button toggle slides
    if(motionIsFinished) {
      sliderButton.addEventListener('click', function() {
        // @todo disable button on animation
        if (activeAbout) {
          motionIsFinished = false;
          anime({
            targets: sliderAboutSpans,
            translateY: '25px',
            duration: 300,
            direction: 'normal',
            easing: 'easeInCubic',
            complete: function () {
              translateElement(sliderAboutSpans, 'translateY(-25px)');
              motionIsFinished = true;
            }
          });
          anime({
            targets: sliderInfoSpans,
            translateY: '0',
            duration: 300,
            direction: 'normal',
            easing: 'easeInCubic'
          });
          activeAbout = false;
          console.log('if')
        } else {
          motionIsFinished = false;
          anime({
            targets: sliderInfoSpans,
            translateY: '25px',
            duration: 300,
            direction: 'normal',
            easing: 'easeInCubic',
            complete: function () {
              translateElement(sliderInfoSpans, 'translateY(-25px)');
              motionIsFinished = true;
            }
          });
          anime({
            targets: sliderAboutSpans,
            translateY: '0',
            duration: 300,
            direction: 'normal',
            easing: 'easeInCubic'
          });
          activeAbout = true;
        }
      });
    }
  }

  function alignSocial() {
    var contentWrapper = document.querySelector('.content-slider-wrapper'),
        socialWrapper = document.querySelector('#social'),
        contentWrapperPosition = 0;

    function alignTextOnResize() {
      contentWrapperPosition = contentWrapper.getBoundingClientRect().left;
      socialWrapper.style.left = parseInt(contentWrapperPosition - 18) + 'px';
    }

    alignTextOnResize();
    window.addEventListener('resize', alignTextOnResize, false);
  }


  var emoji = "🙈";

  console.log('Coded by jakbyco.com ' + emoji)

});


