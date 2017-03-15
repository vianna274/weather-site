$(document).ready(function() {
  $('button').click(function() {
    var message = $("<button type='button' class='btn btn-lg btn-success'>$199</button>");
    message.insertAfter('.buy');
    $(this).remove();
  });
});
