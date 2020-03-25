
function swipeTilesRowsDown(){
  let template = $("middle").css("grid-template-areas")
  template = template.substring(1, template.length - 1)
  let rows = template.split("\" \"")
  let last_row = rows.pop()
  rows.unshift(last_row)
  let joined = rows.join("\" \"")
  $("middle").css("grid-template-areas", "\"" + joined + "\"")
}

function swipeTilesRowsUp(){
  let template = $("middle").css("grid-template-areas")
  template = template.substring(1, template.length - 1)
  let rows = template.split("\" \"")
  let first_row = rows.shift()
  rows.push(first_row)
  let joined = rows.join("\" \"")
  $("middle").css("grid-template-areas", "\"" + joined + "\"")
}

$(window).on('load', function() {
  $(document).keypress(function(event) {
    if(event.keyCode === 119) {
      swipeTilesRowsUp()
    }
    if(event.keyCode === 115) {
      swipeTilesRowsDown()
    }
  });

  $(window).resize(function() {
    $("middle").removeAttr("style")
    });
});