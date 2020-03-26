
function swipeTilesRowsDown(){
  // let template =
  // template = template.substring(1, template.length - 1)
  let rows =  getGridTemplateArea()
  let last_row = rows.pop()
  rows.unshift(last_row)
  let joined = rows.join("\" \"")
  $("middle").css("grid-template-areas", "\"" + joined + "\"")
}

function swipeTilesRowsUp(){
  // let template = getGridTemplateArea()
  // template = template.substring(1, template.length - 1)
  let rows =  getGridTemplateArea()
  let first_row = rows.shift()
  rows.push(first_row)
  let joined = rows.join("\" \"")
  $("middle").css("grid-template-areas", "\"" + joined + "\"")
}

function getGridTemplateArea(){
  let template = $("middle").css("grid-template-areas")
  return template.substring(1, template.length - 1).split("\" \"")
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
  
  $('.rowclick').mouseover( function() {
    let id = $(this).attr('id')
    // let template = getGridTemplateArea()
    let templateRows =  getGridTemplateArea()
    let rowId = templateRows.findIndex(element => element.includes(id))
    let divIds = templateRows[rowId].split(" ")
    // let selector = '#' + divIds.join(', #') // for all row
    let selector = '#' + id // for selected 


    let available_colors = ['rgba(228, 100, 10', 'rgba(228, 10, 100', 'rgba(8, 10, 10', 'rgba(228, 200, 100', 'rgba(22, 100, 100']
    let color = available_colors[Math.floor(Math.random()*available_colors.length)]
    let opacity = ((Math.floor(Math.random() * 5)/10) + 0.5 ).toString();
    $(selector).css('box-shadow', 'inset 0 0 0 1000px ' + color +', ' + opacity + ')' )

    // $('#' + id).css('min-width', '500px')
  });

  $('.rowclick').each( function() {
    let available_colors = ['rgba(228, 100, 10', 'rgba(228, 10, 100', 'rgba(8, 10, 10', 'rgba(228, 200, 100', 'rgba(22, 100, 100']
    let color = available_colors[Math.floor(Math.random()*available_colors.length)]
    let opacity = ((Math.floor(Math.random() * 5)/10) + 0.5 ).toString();
    console.log(color)
    $(this).css('box-shadow', 'inset 0 0 0 1000px ' + color +', ' + opacity + ')' )
  })

  $('.rowclick').click( function() {
    let id = $(this).attr('id')
    // let template = getGridTemplateArea()
    let templateRows =  getGridTemplateArea()
    let rowId = templateRows.findIndex(element => element.includes(id))
    let divIds = templateRows[rowId].split(" ")
    // let selector = '#' + divIds.join(', #') // for all row
    let selector = '#' + id // for selected 


    let available_colors = ['yellow', 'blue', 'red', 'green', 'orange']
    let color = available_colors[Math.floor(Math.random()*available_colors.length)]
    console.log(color)
    $(selector).css('background-color', color)

    // $('#' + id).css('min-width', '500px')
  });
});