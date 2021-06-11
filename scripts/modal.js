$(document).ready(function() {
  // MODAL
  var modalText = {
    brainhack: {
      title: 'BrainHack',
      tag: 'FACE RECOGNITION WEB APPLICATION',
      detail:
        'BrainHack is a web application that uses the Clarifai Face Detection API to detect a faces inside a picture. The goal of this project is to get an introduction to web development and full-stack technologies. ',
      link: 'https://my-brain-hack.herokuapp.com/'
    },
    robofriends: {
      title: 'Robofriends',
      tag: 'WEB APPLICATION',
      detail:
        'BrainHack is a simple web application made using React.js, taking advantage of Redux, React Hooks and React Thunk. Check the website and press Mutate!',
      link: 'https://jimvae.github.io/Robofriends/'
    },
    archangel: {
      title: 'Archangel',
      tag: 'DESKTOP APPOINTMENT MANAGEMENT APPLICATION',
      detail:
        'This is Archangel, an appointment management system for Psychiatrists.',
      link: 'https://ay2021s1-cs2103t-w11-1.github.io/tp/'
    },
    snus: {
      title: 'SNUS',
      tag: 'ANDROID PRODUCTIVITY APPLICATION ',
      detail:
        'SNUS is an all-in-one student productivity application for NUS students, featuring Calendar Planner, Profile, Messaging, Module Forum and Information from NUSMods API',
      link: 'https://github.com/jimvae/SNUS'
    },
    rip: {
      title: 'Rest In Peace',
      tag: 'TOP-DOWN 3D ACTION GAME',
      detail:
        ' Transported to an alternate world overrun by zombies, the protagonist armed, with his trusty revolver, have to collect energy crystals spread across the map to escape this twisted world. Will you help him in his quest to escape?',
      link: 'https://uvents.nus.edu.sg/event/18th-steps/module/CS3247/project/1'
    }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});