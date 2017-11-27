// one page scroll
const sections = $('.section');
const display = $('.content');

let inScroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


const switchMenuActiveClass = sectionEq=>{
    $('.points__item').eq(sectionEq).addClass('is-active')
    .siblings().removeClass('is-active');
}

const performTransition = sectionEq=>{
    if (inScroll)return
        inScroll = true

        // const position = (sectionEq *-100)+'%';
        const position = (sectionEq *-100)+'vh';

        display.css({
            'transform':`translate(0, ${position})`,
           '-webkit-transform':`translate(0, ${position})`
        })
    
        sections.eq(sectionEq).addClass('active')
        .siblings().removeClass('active');

        setTimeout(()=>{
            inScroll = false;
            switchMenuActiveClass(sectionEq);
        },1300);
    }    

    const defineSections = sections=>{
        const activeSection = sections.filter('.active');
        return{
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        }
    }

const scrollToSection = direction=>{
    const section = defineSections(sections)

    if(inScroll) return;

    if(direction==='up' && section.nextSection.length){
        performTransition(section.nextSection.index())
    }

    if(direction==='down' && section.prevSection.length){
        performTransition(section.prevSection.index())
    }
}

$('.wrapper').on({
    wheel: e => {
        const deltaY = e.originalEvent.deltaY;
        // const section = defineSections(sections);
        
        // if (deltaY > 0 && section.nextSection.length){
        //     console.log('вниз');
        //     performTransition(section.nextSection.index())
        // }
        
        // if (deltaY < 0 && section.prevSection.length){
        //     console.log('вверх');
        //     performTransition(section.prevSection.index())
        // }
        let direction = (deltaY>0) 
        ? 'up' 
        : 'down'

        scrollToSection(direction);
    },
    touchMove: e =>(e.preventDefault())
});

$(document).on('keydown', e =>{
    console.log(e.keyCode);
    const section = defineSections(sections);

    if (inScroll) return

    switch(e.keyCode){
        case 40: //вверх
        if (!section.nextSection.length) return;
        performTransition(section.nextSection.index());
        break;

        case 38: //вниз
        if (!section.prevSection.length) return;
        performTransition(section.prevSection.index());
        break;
    }
});

if (isMobile){
    $(window).swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            scrollToSection(direction);
          }
    })
}



$('[data-scroll-to]').on('click touchStart', e =>{
    e.preventDefault();
    const $this = $(e.currentTarget);
    const sectionIndex = $this.attr('data-scroll-to');

    performTransition(sectionIndex);
})


//slider
let owlCarousel = () => {
    const burgerCarousel = $(".burgers__list").owlCarousel({
      items: 1,
      nav: true,
      navContainer: $(".slider__arrows"),
      navText: ["", ""],
      loop: true
    });

    $(".slider__arrows-next").on("click", e => {
      e.preventDefault();
      burgerCarousel.trigger("next.owl.carousel");
    });

    $(".slider__arrows-prev").on("click", e => {
      e.preventDefault();
      burgerCarousel.trigger("prev.owl.carousel");
    });
  };

  owlCarousel();


  //horizontal acco
let teamAcco = () => {
    $(".accordeon__link").on("click", e => {
      e.preventDefault();

      const $this = $(e.target);
      const item = $this.closest(".accordeon__item");
      const container = $this.closest(".accordeon");
      const items = $(".accordeon__item", container);
      const content = item.find(".accordeon__desc");
      const otherContent = $(".accordeon__desc", container);

      if (!item.hasClass("accordeon__item--active")) {
        items.removeClass("accordeon__item--active");
        item.addClass("accordeon__item--active");
        otherContent.stop(true).slideUp();
        content.stop(true).slideDown();
      } else {
        item.removeClass("accordeon__item--active");
        content.stop(true).slideUp();
      }
    });
  };

  teamAcco();


// vertical acco

let verticalAcco = () => {
    let calculateWidth = () => {
      let windowWidth = $(window).width();
      let links = $(".menu__acco-link");
      let linksWidth = links.width();
      
      let reqWidth = windowWidth - linksWidth * links.length;

      return reqWidth > 540 ? 540 : reqWidth;
    };

    let openItem = item => {
      let container = $(".menu__acco");
      let otherItems = $(".menu__acco-item", container);
      let content = item.find(".menu__acco-desc");
      let accoText = $(".menu__acco-text", container);
      let activeItem = otherItems.filter(".active");
      let activeContent = activeItem.find(".menu__acco-desc");
      let openWidth = calculateWidth();

      otherItems.removeClass("active");
      item.addClass("active");

      accoText.hide();
      activeContent.animate({ width: "0px" });

      content.animate(
        {
          width: openWidth + "px"
        },
        function() {
          accoText.fadeIn();
        }
      );
    };

    const closeItem = item => {
      item.removeClass("active");

      item
        .closest(".menu__acco")
        .find(".menu__acco-text")
        .stop(true, true)
        .fadeOut(function() {
          item.find(".menu__acco-desc").animate({ width: "0px" });
        });
    };

    $(".menu__acco-link").on("click", e => {
      e.preventDefault();
      let $this = $(e.target);
      let item = $this.closest(".menu__acco-item");
      item.hasClass("active") ? closeItem(item) : openItem(item);
    });
    
    
    $(document).on("click", e => {
      const $this = $(e.target);

      if (!$this.closest(".menu__acco").length) {
        closeItem($(".menu__acco-item"));
      }
    });
  };

  verticalAcco();

  //review


  
  //Yandex Map

  ymaps.ready(init);
  
  var placemarks = [ 
    {
      latitude: 52.96867353,
      longitude: 36.06171229,
      hintContent: '<div class="map__hint">Брестская ул. д. 14</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
        '<div class="map__text">Самые вкусные бургеры, заходите в гости</div>',
        "</div>"
      ]
    },
    {
      latitude: 52.98867353,
      longitude: 36.08171229,
      hintContent: '<div class="map__hint">Брестская ул. д. 14</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
        '<div class="map__text">Самые вкусные бургеры, заходите в гости</div>',
        "</div>"
      ]
    },
    {
      latitude: 52.94867353,
      longitude: 36.09171229,
      hintContent: '<div class="map__hint">Брестская ул. д. 14</div>',
      balloonContent: [
        '<div class="map__balloon">',
        '<img class="map__burger-img" src="img/burger.png" alt="Бургер"/>',
        '<div class="map__text">Самые вкусные бургеры, заходите в гости</div>',
        "</div>"
      ]
    }
  ];
  
  
  function init() {
    // var map = new ymaps.Map("map", {
    //   center: [52.96867353, 36.06171229],
    //   zoom: 13,
    //   controls: ["zoomControl"], 
    //   behaviors: ['drag']
    // });

    var map = new ymaps.Map("map", {
        center: [52.96867353, 36.06171229],
        zoom: 13,
        controls: ["zoomControl"], 
        behaviors: ["drag"]
      });
      map.behaviors.disable(['drag', 'scrollZoom', 'dblClickZoom'])
      
    placemarks.forEach(function(item){
      var placemark = new ymaps.Placemark(
          [item.latitude, item.longitude],
          {
            hintContent: item.hintContent,
            balloonContent: item.balloonContent.join("")
          },
          {
            iconLayout: "default#image",
            iconImageHref: "img/map-marker.svg",
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
          });
          map.geoObjects.add(placemark);
    })
  }



  //fancybox
  let fancyboxModal = () => {
    $(".feedback__more-link").fancybox({
      touch: true,
      smallBtn: false
    });
    $(".full__review-close").on("click", e => {
      e.preventDefault();
      $.fancybox.close();
    });
  };
  fancyboxModal();

  //mask

  $('.phone-mask').inputmask('+7 (999) 999 99 99');

  //form

  var ajaxForm = function (form) {
    var url = form.attr('action'),
        data = form.serialize();
    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });
}   
var submitForm = function (e) {
e.preventDefault();
var form = $(e.target);
var request = ajaxForm(form);
request.done(function(msg) {
  const popup = msg.status ? '#success' : '#error';
  $status = $(popup)

  $.fancybox.open( 
    $status
  , {
      type: 'inline',
      maxWidth: 250,
      fitToView: false,
      padding: 0,
      afterClose() {
        form.trigger('reset');
      }
    });
  });

  request.fail(function(jqXHR, textStatus) {
    $.fancybox.open( 
      $('#error').html("На сервере произошла ошибка: " + textStatus)
    , {
        type: 'inline',
        maxWidth: 250,
        fitToView: false,
        padding: 0,
        afterClose() {
          form.trigger('reset');
        }
      });
  });
}

$('#form__elem').on('submit', submitForm)