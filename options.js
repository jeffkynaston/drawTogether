
function updateCurrentColor() {
	$.each($('.color-button'), function(i, arr){$(arr).removeClass("current-option-color")});
	switch(curColor) {
    case colorGreen:
      $('#green').addClass("current-option-color")
      break;
    case colorGray:
      $('#gray').addClass("current-option-color")
        break;
    case colorPink:
      $('#pink').addClass("current-option-color")
        break;
    case colorOrange:
      $('#orange').addClass("current-option-color")
        break;
    case colorBlue:
      $('#blue').addClass("current-option-color")
        break;
    default:
        return true
	}
}


function updateCurrentSize() {
	$.each($('.size-button'), function(i, arr){$(arr).removeClass("current-option-size")});
	switch(curSize) {
    case 2:
      $('#size-two').addClass("current-option-size")
      break;
    case 5:
      $('#size-five').addClass("current-option-size")
        break;
    case 10:
      $('#size-ten').addClass("current-option-size")
        break;
    case 20:
      $('#size-twenty').addClass("current-option-size")
        break;
    default:
        return true
	}
}

function updateCurrentTool() {
	$.each($('.tool-button'), function(i, arr){$(arr).removeClass("current-option-tool")});
	switch(curTool) {
    case "pen":
      $('#pen').addClass("current-option-tool")
      updateCurrentColor()
      updateCursor("\uf1fc")
      break;
    case "pencil":
      $('#pencil').addClass("current-option-tool")
      $.each($('.color-button'), function(i, arr){$(arr).removeClass("current-option-tool")});
      updateCursor("\uf040")
        break;
    case "eraser":
      $('#eraser').addClass("current-option-tool")
      $.each($('.color-button'), function(i, arr){$(arr).removeClass("current-option-tool")});
      updateCursor("\uf12d")
        break;
    default:
        return true
	}
}

function bindColorOptions() {
	$('#green').click(function(e){
		curColor = colorGreen
		curTool = "pen"
		updateCurrentTool()
		updateCurrentColor()
	});
	$('#gray').click(function(e){
		curColor = colorGray
		curTool = "pen"
		updateCurrentTool()
		updateCurrentColor()
	});
	$('#pink').click(function(e){
		curColor = colorPink
		curTool = "pen"
		updateCurrentTool()
		updateCurrentColor()
	});
	$('#orange').click(function(e){
		curColor = colorOrange
		curTool = "pen"
		updateCurrentTool()
		updateCurrentColor()
	});
	$('#blue').click(function(e){
		curColor = colorBlue
		curTool = "pen"
		updateCurrentTool()
		updateCurrentColor()
	});
}

function bindSizeOptions() {
	$('#size-two').click(function(e){
		curSize = 2
		updateCurrentSize()
	});
	$('#size-five').click(function(e){
		curSize = 5
		updateCurrentSize()
	});
	$('#size-ten').click(function(e){
		curSize = 10
		updateCurrentSize()
	});
	$('#size-twenty').click(function(e){
		curSize = 20
		updateCurrentSize()
	});
}

function bindToolOptions() {
	$('#pen').click(function(e){
		curTool = "pen"
		updateCurrentTool()
	});
	$('#pencil').click(function(e){
		curTool = "pencil"
		updateCurrentTool()
	});
	$('#eraser').click(function(e){
		curTool = "eraser"
		updateCurrentTool()
	});
}

function bindAdminOptions() {
	$('#undo').click(function(e){
		unDo()
	});

	$('#redo').click(function(e){
		reDo()
	});
	$('#clear').click(function(e){
		clearDrawing()
		clearCanvas()
		redraw()
	});
}

function updateCursor(escapeCode) {
	  var canvas = document.createElement("canvas");
    canvas.width = 30;
    canvas.height = 30;
    var ctx = canvas.getContext("2d");
    if (curTool == "pen") {
    	ctx.fillStyle = curColor;
    } else {
    	ctx.fillStyle = "#717574";
    }
    ctx.font = "24px FontAwesome";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(escapeCode, 15, 15);
    var dataURL = canvas.toDataURL('image/png')
    $('canvas').css('cursor', 'url('+dataURL+'), auto');
}