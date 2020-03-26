
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

  // --------- FEATURE 1 TILES SLIDER ---------------
  $(document).keypress(function(event) {
    if(event.keyCode === 119) {
      swipeTilesRowsUp()
    }
    if(event.keyCode === 115) {
      swipeTilesRowsDown()
    }
  });

    // clean tiles order after resize 
  $(window).resize(function() {
    $("middle").removeAttr("style")
    });
  // --------- FEATURE 1 -----------------

  

  // ---------- FEATURE 2 CHANGE TILES COLOR ON ------------------
  $('.rowclick').mouseover( function() {
    let id = $(this).attr('id')
    // let template = getGridTemplateArea()
    let templateRows =  getGridTemplateArea()
    let rowId = templateRows.findIndex(element => element.includes(id))
    let divIds = templateRows[rowId].split(" ")
    // let selector = '#' + divIds.join(', #') // for all row
    let selector = '#' + id // for selected 


    let available_colors = ['rgba(183,28,28', 'rgba(136,14,79', 'rgba(74,20,140', 'rgba(49,27,146', 'rgba(26,35,126', 'rgba(13,71,161', 'rgba(1,87,155', 'rgba(0,96,100', 'rgba(0,77,64', 'rgba(27,94,32', 'rgba(51,105,30', 'rgba(130,119,23']
    let color = available_colors[Math.floor(Math.random()*available_colors.length)]
    let opacity = ((Math.floor(Math.random() * 5)/10) + 0.5 ).toString();
    $(selector).css('box-shadow', 'inset 0 0 0 1000px ' + color +', ' + opacity + ')' )

    // $('#' + id).css('min-width', '500px')
  });
  // ----------- FEATURE 2 -----------------------------------


  // COLORIZE TILES AT START
  function colorizeTilesAtStrat() {
    $('.rowclick').each( function() {
      let available_colors = ['rgba(183,28,28', 'rgba(136,14,79', 'rgba(74,20,140', 'rgba(49,27,146', 'rgba(26,35,126', 'rgba(13,71,161', 'rgba(1,87,155', 'rgba(0,96,100', 'rgba(0,77,64', 'rgba(27,94,32', 'rgba(51,105,30', 'rgba(130,119,23']
      let color = available_colors[Math.floor(Math.random()*available_colors.length)]
      let opacity = ((Math.floor(Math.random() * 5)/10) + 0.5 ).toString();
      // console.log(color)
      $(this).css('box-shadow', 'inset 0 0 0 1000px ' + color +', ' + opacity + ')' )
    })
  }
  colorizeTilesAtStrat()
  // COLORIZE TILES


  // --------------- FEATURE 3 ENLARGE TILE ------------------------------
  let resetCss = false
  $('.rowclick').click( function() {
    let id = $(this).attr('id')
    // let template = getGridTemplateArea()
    let templateRows =  getGridTemplateArea()
    let rowsNumber = templateRows.length
    let rowId = templateRows.findIndex(element => element.includes(id))
    let divIds = templateRows[rowId].split(" ")
    let columnsNumber = divIds.length

    // new template
    let row = "\"" + id + (" " + id).repeat(columnsNumber - 1) + "\""
    let template = row + (" " + row).repeat(rowsNumber - 1)

    // console.log(template)
    // $("middle").css("grid-template-areas", "\"" + id + "\"")

    let selector = ''
    var i;
    for (i = 0; i < rowsNumber; i++) {
      selector += "#" + templateRows[i].split(" ").join(', #')
      if(i != rowsNumber - 1) { selector += ', ' }
    }

    selector = selector.split("#" + id + ',').join('').split("#" + id).join('')

    // change opacity step by step
    let opacity = 1;
    let opacityStep = 0.01

    function changeOpacity() {
      if(opacity >= opacityStep){
        opacity -= opacityStep
        $(selector).css('opacity', opacity)
        setTimeout(changeOpacity, 20);
      } else {
        // resize tile
        $(selector).css('display', 'none')
        $("middle").css("grid-template-areas", template)
        $('#' + id).css("width", '100%')
        $('#' + id).css("height", '100%')
        $('#' + id).css("padding", '0px')
        resetCss = true
      }
    }

    changeOpacity()

    // let selector = '#' + divIds.join(', #') // for all row
    // let selector = '#' + id // for selected 


    // let available_colors = ['yellow', 'blue', 'red', 'green', 'orange']
    // let color = available_colors[Math.floor(Math.random()*available_colors.length)]
    // console.log(color)
    // $(selector).css('background-color', color)

    // $('#' + id).css('min-width', '500px')
  });

      // clean tiles order after resize 
  $(window).resize(function() {
    if(resetCss) {
      $(".rowclick").removeAttr("style")
      colorizeTilesAtStrat()
      resetCss = false
    }
  });
  // ----------------- FEATURE 3 -------------------------------------
});