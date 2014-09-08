
function updateCurrentColor() {
	$.each($('.color-button'), function(i, arr){$(arr).removeClass("current-option")});
	switch(curColor) {
    case colorGreen:
      $('#green').addClass("current-option")
      break;
    case colorGray:
      $('#gray').addClass("current-option")
        break;
    case colorPink:
      $('#pink').addClass("current-option")
        break;
    case colorOrange:
      $('#orange').addClass("current-option")
        break;
    case colorBlue:
      $('#blue').addClass("current-option")
        break;
    default:
        return true
	}
}


function updateCurrentSize() {
	$.each($('.size-button'), function(i, arr){$(arr).removeClass("current-option")});
	switch(curSize) {
    case 2:
      $('#size-two').addClass("current-option")
      break;
    case 5:
      $('#size-five').addClass("current-option")
        break;
    case 10:
      $('#size-ten').addClass("current-option")
        break;
    case 20:
      $('#size-twenty').addClass("current-option")
        break;
    default:
        return true
	}
}

function updateCurrentTool() {
	$.each($('.tool-button'), function(i, arr){$(arr).removeClass("current-option")});
	switch(curTool) {
    case "pen":
      $('#pen').addClass("current-option")
      break;
    case "pencil":
      $('#pencil').addClass("current-option")
        break;
    case "eraser":
      $('#eraser').addClass("current-option")
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