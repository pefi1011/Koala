$(document).on('click',function(e) {
  if($(e.target).attr('class') != 'navbar-toggle' ) {
    $('.navbar-collapse.in').collapse('hide');
  }
});
