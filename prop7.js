
function swipeTilesRowsDown(){
  let rows =  getGridTemplateArea()
  let last_row = rows.pop()
  rows.unshift(last_row)
  setGridTemplate(rows)
}

function swipeTilesRowsUp(){
  let rows =  getGridTemplateArea()
  let first_row = rows.shift()
  rows.push(first_row)
  setGridTemplate(rows)
}

function getGridTemplateArea(){
  let template = $("middle").css("grid-template-areas")
  return template.substring(1, template.length - 1).split("\" \"")
}

function setGridTemplate(rows) {
  let joined = rows.join("\" \"")
  $("middle").css("grid-template-areas", "\"" + joined + "\"")
}

function colorizeTilesAtStrat() {
  $('.rowclick').each( function() { setRandomColorsFor(this) })
}

function setRandomColorsFor(selector) {
  let available_colors = ['rgba(183,28,28', 'rgba(136,14,79', 'rgba(74,20,140', 'rgba(49,27,146', 'rgba(26,35,126', 'rgba(13,71,161', 'rgba(1,87,155', 'rgba(0,96,100', 'rgba(0,77,64', 'rgba(27,94,32', 'rgba(51,105,30', 'rgba(130,119,23']
  let color = available_colors[Math.floor(Math.random()*available_colors.length)]
  let opacity = ((Math.floor(Math.random() * 5)/10) + 0.5 ).toString();
  $(selector).css('box-shadow', 'inset 0 0 0 1000px ' + color +', ' + opacity + ')' )
}

function newTemplateFilledWithOneId(id, rowsNumber, columnsNumber) {
  let row = "\"" + id + (" " + id).repeat(columnsNumber - 1) + "\""
  let template = row + (" " + row).repeat(rowsNumber - 1)

  return template;
}

function selectorWithAllIdsExceptClickedId(id, templateRows) {
  let rowsNumber = templateRows.length

  let selector = ''
  var i;
  for (i = 0; i < rowsNumber; i++) {
    selector += "#" + templateRows[i].split(" ").join(', #')
    if(i != rowsNumber - 1) { selector += ', ' }
  }

  selector = selector.split("#" + id + ',').join('').split("#" + id).join('')

  return selector;
}

function changeOpacity(opacity, opacityStep, template, selector, id) {
  if(opacity >= opacityStep){
    $(selector).css('opacity', opacity)
    setTimeout(function() { changeOpacity(opacity - opacityStep, opacityStep, template, selector, id) }, 20);
  } else {
    // resize tile
    $(selector).css('display', 'none')
    $("middle").css("grid-template-areas", template)
    $('#' + id).css("width", '100%')
    $('#' + id).css("height", '100%')
    $('#' + id).css("padding", '0px')
  }
}


$(window).on('DOMContentLoaded', function() {
  colorizeTilesAtStrat()

  // --------- FEATURE 1 TILES SLIDER ---------------
  $(document).keypress(function(event) {
    if(event.keyCode === 119) {
      swipeTilesRowsUp()
    }
    if(event.keyCode === 115) {
      swipeTilesRowsDown()
    }
  });

  $(window).resize(function() { $("middle").removeAttr("style") });   // clean grid template after resize 
  // --------- FEATURE 1 -----------------

  // ---------- FEATURE 2 CHANGE TILES COLOR ON ------------------
  $('.rowclick').mouseover( function() {
    let id = $(this).attr('id')
    let selector = '#' + id
    setRandomColorsFor(selector)
  });
  // ----------- FEATURE 2 -----------------------------------


  // --------------- FEATURE 3 ENLARGE TILE ------------------------------
  let resetCss = false
  $('.rowclick').click( function() {
    let id = $(this).attr('id')
    let templateRows =  getGridTemplateArea()
    let rowsNumber = templateRows.length
    let columnsNumber = templateRows[0].split(" ").length

    let opacity = 1;
    let opacityStep = 0.01
    let template = newTemplateFilledWithOneId(id, rowsNumber, columnsNumber)
    let selector = selectorWithAllIdsExceptClickedId(id, templateRows)

    changeOpacity(opacity, opacityStep, template, selector, id)
    resetCss = true
  });

  $(window).resize(function() { // clean tiles style after resize 
    if(resetCss) {
      $(".rowclick").removeAttr("style")
      colorizeTilesAtStrat()
      resetCss = false
    }
  });
  // ----------------- FEATURE 3 -------------------------------------
});
