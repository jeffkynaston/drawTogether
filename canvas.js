window.onload=function(){
	createCanvas(mainCanvas)
	bindListeners()
};

var mainCanvas = {
	"width": "600px",
	"height": "600px"
}

var crayonTextureImage = new Image();
crayonTextureImage.src = "images/crayon-texture.png";

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colorGreen = "#06FF0C";
var colorGray = "#717574";
var colorPink = "#FF0D61";
var colorOrange = "#FF5000";
var colorBlue = "#12BAFF";
var curColor = colorBlue;
var clickColor = new Array();

var clickSize = new Array();
var curSize = "normal";

var clickTool = new Array();
var curTool = "crayon";

function createCanvas(thisCanvas) {
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', thisCanvas.width);
	canvas.setAttribute('height', thisCanvas.height);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");
}

function bindListeners() {
	bindMouseDown()
	bindMoveMouse()
	bindMouseUp()
	bindMouseLeave()
	bindColorOptions()
	bindSizeOptions()
}

function bindMouseDown() {
	$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
}

function bindMoveMouse() {
	$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});
}

function bindMouseUp() {
	$('#canvas').mouseup(function(e){
  	paint = false;
	});
}

function bindMouseLeave() {
	$('#canvas').mouseleave(function(e){
  	paint = false;
	});
}

function bindColorOptions() {
	$('#green').click(function(e){
		curColor = colorGreen
		console.log('now switched to: ' + colorGreen)
	});
	$('#gray').click(function(e){
		curColor = colorGray
		console.log('now switched to: ' + colorGray)
	});
	$('#pink').click(function(e){
		curColor = colorPink
		console.log('now switched to: ' + colorPink)
	});
	$('#orange').click(function(e){
		curColor = colorOrange
		console.log('now switched to: ' + colorOrange)
	});
	$('#blue').click(function(e){
		curColor = colorBlue
		console.log('now switched to: ' + colorBlue)
	});
}

function bindSizeOptions() {
	$('#small').click(function(e){
		curSize = "small"
		console.log('now switched to: small')
	});
	$('#normal').click(function(e){
		curSize = "normal"
		console.log('now switched to: normal')
	});
	$('#large').click(function(e){
		curSize = "large"
		console.log('now switched to: large')
	});
	$('#huge').click(function(e){
		curSize = "huge"
		console.log('now switched to: huge')
	});
}


function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curTool == "eraser"){
    clickColor.push("white");
  }else{
    clickColor.push(curColor);
  }
  console.log(curColor)
  clickColor.push(curColor);
  clickSize.push(curSize);
}


function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  context.lineJoin = "round";
			
		var radius;
		var i = 0;
		for(i=0; i < clickX.length; i++)
		{	if(clickSize[i] == "small"){
				radius = 2;
			}else if(clickSize[i] == "normal"){
				radius = 5;
			}else if(clickSize[i] == "large"){
				radius = 10;
			}else if(clickSize[i] == "huge"){
				radius = 20;
			}else{
				alert("Error: Radius is zero for click " + i);
				radius = 0;	
			}
		}

  for(i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }
     else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.strokeStyle = clickColor[i];
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.lineWidth = radius;
     context.stroke();
  }
  if(curTool == "crayon") {
    context.globalAlpha = 0.4;
    context.drawImage(crayonTextureImage, 0, 0, mainCanvas.width, mainCanvas.height);
  }
  context.globalAlpha = 1;


}

function clearCanvas() {
	context.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
}