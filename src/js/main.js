document.addEventListener('DOMContentLoaded', function() {
  // Loader motion
  var app = document.querySelector('#app'),
      loader = document.querySelector('#loader');

  loader.style.opacity = '0';
  app.style.opacity = '1';

  // Media query listener
  var mediaQuery = window.matchMedia('(min-width: 1024px)');
  mediaQuery.addListener(runOnDesktop);
  runOnDesktop(mediaQuery);

  // Run functions over 1024px
  function runOnDesktop(media) {
    if(media.matches) {
      alignSocial();
      sliderChange();
    }
  }

  // Slider motion
  function sliderChange() {
    var sliderAbout = document.querySelector('.slider-about'),
        sliderAboutSpans = sliderAbout.querySelectorAll('.slider-span'),
        sliderInfo = document.querySelector('.slider-info'),
        sliderInfoSpans = sliderInfo.querySelectorAll('.slider-span'),
        sliderButton = document.querySelector('#slider-button'),
        activeAbout = true,
        counter,
        motionDuration = 300,
        motionEasing = 'easeInCubic',
        motionDirection = 'normal';

    function translateElement(element, translate) {
      for(counter = 0; counter < element.length; counter++ ) {
        element[counter].style.transform = translate;
      }
    }

    // Hide second slide
    translateElement(sliderInfoSpans, 'translateY(-25px)');

    // Button toggle slides
    sliderButton.addEventListener('click', sliderTransform);

    function blockButton() {
      sliderButton.removeEventListener('click', sliderTransform);
    }

    function unblockButton() {
      sliderButton.addEventListener('click', sliderTransform);
    }

    function sliderTransform() {
      if (activeAbout) {
        blockButton();
        activeAbout = false;
        anime({
          targets: sliderAboutSpans,
          translateY: '25px',
          duration: motionDuration,
          direction: motionDirection,
          easing: motionEasing,
          complete: function () {
            translateElement(sliderAboutSpans, 'translateY(-25px)');
            motionIsFinished = true;
            unblockButton();
          }
        });
        anime({
          targets: sliderInfoSpans,
          translateY: '0',
          duration: motionDuration,
          direction: motionDirection,
          easing: motionEasing
        });

      } else {
        blockButton();
        activeAbout = true;
        anime({
          targets: sliderInfoSpans,
          translateY: '25px',
          duration: motionDuration,
          direction: motionDirection,
          easing: motionEasing,
          complete: function () {
            translateElement(sliderInfoSpans, 'translateY(-25px)');
            motionIsFinished = true;
            unblockButton()
          }
        });
        anime({
          targets: sliderAboutSpans,
          translateY: '0',
          duration: motionDuration,
          direction: motionDirection,
          easing: motionEasing
        });
      }
    }
  }

  // Social icon align
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

  // Emoji console log
  var emoji = '🙈';
  console.log('Coded by jakbyco.com ' + emoji)
});


