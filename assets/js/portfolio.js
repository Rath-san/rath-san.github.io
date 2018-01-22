// sidebar toggle
function toggleSidebar(item) {
  var toggler = $(item)
  toggler.on('click', function() {
    toggler.toggleClass('is--open')
    $('.sidebar').toggleClass('is--open')
  })
}

// md-inputs
var mdInput = $('.md-input .form-control')

mdInput.on('focus', function(){
  $(this).parent('.md-input').addClass('is--active')
})

mdInput.on('focusout', function(){
  if (!$.trim(this.value).length) {
    $(this).parent('.md-input').removeClass('is--active')
  }
});

mdInput.each(function() {
  if ($(this).val() !== "") {
    $(this).parent('.md-input').addClass('is--active')
  }
})

// form validation

function validateForm() {
  var validName = $('#inputName'),
      validEmail = $('#inputEmail'),
      validNumber = $('#inputNumber'),
      validText = $('#inputText')

  if (validName.val() == "") {

  }

  // console.log(validName, validEmail, validNumber, validText);

}


function isSeen(item) {
  // console.log($(item).length);
  var wH = $(window).height();

  for (var i = 0; i < $(item).length; i++) {
    // console.log($(item).eq(i).offset().top);
    var elem = $(item).eq(i)
    var wST = $(window).scrollTop()
//
    if ((wST + wH/2 > elem.offset().top) && (elem.offset().top + elem.height()) > (wST + wH/2)) {
      $(item).eq(i).addClass('is--active')
      // return true
    } else {
      $(item).eq(i).removeClass('is--active')
      // return false
    }
  }
  var wH = $(window).height();
}
//equal columns
function equalColumns() {
  var container = $('.equal-row')
  var containerHeight = container.height()
  var columns = container.children()

  for (var c = 0; c < columns.length; c++) {
    columns.eq(c).css('height', containerHeight)
    // console.log(columns[c]);
  }
}

$(document).ready(function(){
  sectionInView('section', 200)

  var wW = $(window).width()
  if (wW < 768) {

    $(window).on('scroll', function(){
      isSeen('.card')
    });
    $('section').addClass('is--visible')

  } else {

    // equalColumns();

    $('.card').hover(function(){
      $(this).toggleClass('is--active')
    })

    $(window).on('scroll', function(){
      sectionInView('section', 200)
    });

  }


  //footer jumping i no content
  if($('body').height() > $(window).height()) {
    $('.footer').removeClass('is--fixed')
  } else {
    $('.footer').addClass('is--fixed')
  }

  toggleSidebar('.sidebar-toggle')
  // equalHeight()

  //section in view
  function sectionInView(section, offset) {
    var s = $(section);

    var v = $(window)
    var vH = v.height()
    var vST = v.scrollTop()

    var fL = vST + vH - offset

    // var fLIndicator =
    //     `<div style="
    //       position: fixed;
    //       width: 100%;
    //       height: 2px;
    //       background-color: red;
    //       top: `+ fL +`px;
    //     ">line</div>`
    //
    //
    // $('body').append(fLIndicator)

    s.each(function() {
      if ($(this).offset().top < fL) {
        $(this).addClass('is--visible')
      }

    })

  }


  // owl-carousel
  if ($('.owl-sb-carousel').length > 0) {
    $('.owl-sb-carousel').owlCarousel({
      loop:true,
      items: 1,
      nav:true,
      navText: [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.56 38.29"><polyline points="0.71 0.71 19.14 19.14 0.71 37.58" fill=none stroke-miterlimit="10" stroke-width="2"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.56 38.29"><polyline points="0.71 0.71 19.14 19.14 0.71 37.58" fill=none stroke-miterlimit="10" stroke-width="2"/></svg>'
      ],
      dots: true
      // margin:10,
      // responsive:{
      //     0:{
      //         items:1
      //     },
      //     600:{
      //         items:3
      //     },
      //     1000:{
      //         items:5
      //     }
      // }
    });
  }
})

// alternative to DOMContentLoaded
// document.onreadystatechange = function (e) {
//   if (document.readyState === "interactive") {
//
//     var all = document.getElementsByTagName("*");
//     for (var i=0, max=all.length; i < max; i++) {
//       set_ele(all[i]);
//     }
//
//   }
//
//   function check_element(ele) {
//     var all = document.getElementsByTagName("*");
//     var totalele = all.length;
//     // var per_inc=100/all.length;
//
//     if($(ele).on()) {
//       console.log(ele);
//     }
//
//     else
//     {
//       set_ele(ele);
//     }
//   }
//
//   function set_ele(set_element) {
//     check_element(set_element);
//   }
// }

let g = $('.grid')
if (g.length > 0) {

  g.masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });

  g.imagesLoaded().progress(function() {
    g.masonry('layout');
  })

  let gI = $('.grid-item')

  gI.each(function(i, v) {
    // console.log(i);
    setTimeout(function() {
      // console.log(v)
      $(v).addClass('animateIn')
    }, i*90);

  })

}


let i = $('#apiFrame')
if (i.length > 0) {

  let iframe = i[0];
  let urlid = i.attr("data-url");

  let version = '1.0.0'
  // By default, the latest version of the viewer API will be used.
  let client = new Sketchfab(version, iframe);

  // Alternatively, you can request a specific version.
  // var client = new Sketchfab( '1.0.0', iframe );

  let success = function onSuccess(api) {
    api.start();
    api.addEventListener('viewerready', function() {

      console.log('Viewer is ready');
      api.stop() //stop / start

    });
  }

  let error = function onError() {

    console.log('Viewer error');

  }

  client.init(urlid, {
    success: success,
    error: error,
    ui_controls: 0
  });
}
