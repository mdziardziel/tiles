
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
  
  $('.rowclick').hover( function() {
    let id = $(this).attr('id')
    // let template = getGridTemplateArea()
    let templateRows =  getGridTemplateArea()
    let rowId = templateRows.findIndex(element => element.includes(id))
    let divIds = templateRows[rowId].split(" ")
    // let selector = '#' + divIds.join(', #') // for all row
    let selector = '#' + id // for selected 

    let size = $(selector).css('background-size') 

    let new_size = null;
    if(size == 'cover') {
      new_size = '0px 0px'
    } else {
      new_size = 'cover'
    }
    $(selector).css('background-size', new_size)

    // $('#' + id).css('min-width', '500px')
  });

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