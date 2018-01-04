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
  console.log($(this).val());
});

// .card-holder


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
    console.log(columns[c]);
  }
}

$(document).ready(function(){
  console.log('hello, portfolio!');

  var wW = $(window).width()
  // console.log(wW);

  if (wW < 768) {
    $(window).on('scroll', function(){
      isSeen('.card')
    });
  } else {
    equalColumns();
    $('.card').hover(function(){
      $(this).toggleClass('is--active')
    })
  }


  //footer jumping i no content
  if($('body').height() > $(window).height()) {
    $('.footer').removeClass('is--fixed')
  } else {
    $('.footer').addClass('is--fixed')
  }

  toggleSidebar('.sidebar-toggle')
  // equalHeight()

  // owl-carousel
  $('.owl-carousel').owlCarousel({
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
})
})
