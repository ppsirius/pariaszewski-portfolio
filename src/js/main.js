function init(){

    var sliderAboutSpans = document.querySelectorAll('.slider-about .slider-span'),
        sliderInfoSpans = document.querySelectorAll('.slider-info .slider-span'),
        sliderButton = document.querySelector('#slider-button'),
        sliderButtonSpan = sliderButton.querySelector('.slider-button-info'),
        socialSpans = document.querySelectorAll('.social-span'),
        app = document.querySelector('#app'),
        loader = document.querySelector('#loader'),
        motionDuration = 300,
        motionEasing = 'easeInQuad',
        motionDirection = 'normal',
        contentWrapper = document.querySelector('.content-slider-wrapper'),
        socialWrapper = document.querySelector('#social'),
        contentWrapperPosition = 0,
        counter;

  // Loader motion
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

  console.log(anime.easings);

  // Transform element
  function translateElement(element, translate) {
    if(typeof element == 'undefined') {
        console.log('ssssss')
        element.style.transform = translate;
    } else {
        for(counter = 0; counter < element.length; counter++ ) {
            element[counter].style.transform = translate;
        }
    }
  }

  // Init reset elements
  translateElement(sliderAboutSpans, 'translateY(-25px)');
  translateElement(sliderButtonSpan, 'translateY(-25px)');
  translateElement(socialSpans, 'translateY(-25px)');

  // Init load elements
  anime({
      targets: sliderAboutSpans,
      translateY: '0',
      duration: motionDuration,
      direction: motionDirection,
      easing: motionEasing,
      delay: 1000,
      complete: function () {
          anime({
              targets: socialSpans,
              translateY: '0',
              duration: motionDuration,
              direction: motionDirection,
              easing: motionEasing,
              delay: function(el, index) {
                  return index * 100;
              },
              complete: function () {

              }
          });
      }
  });

  // Slider motion
  function sliderChange() {
    var activeAbout = true;

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
};
