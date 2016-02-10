$(document).ready(function() {
  var count = 0;
  $('.cat').on('click', function() {
    count++;
    $('.count').html(count);
  });
});