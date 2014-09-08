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

var pointsDrawn = []
var	unDoPointStore = []



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
var curSize = 5

var clickTool = new Array();
var curTool = "pen";

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
	bindToolOptions()
	bindAdminOptions()
}

function bindMouseDown() {
	$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
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




function addClick(x, y, dragging) {
	pointsDrawn.push({"x": x,
										"y": y,
										"dragged?": dragging,
										"color": curColor,
										"size": curSize,
										"tool": curTool})
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
			

  for(i=0; i < pointsDrawn.length; i++) {		
    context.beginPath();
    if(pointsDrawn[i]["dragged?"] && i){
      context.moveTo(pointsDrawn[i-1].x, pointsDrawn[i-1].y);
     }
     else{
       context.moveTo(pointsDrawn[i].x-1, pointsDrawn[i].y);
     }
		 var radius = pointsDrawn[i].size
     context.strokeStyle = pointsDrawn[i].color
     if(pointsDrawn[i].tool == "eraser") {
     context.strokeStyle = "#fff"
  	 }
     context.lineWidth = radius;
     context.lineTo(pointsDrawn[i].x, pointsDrawn[i].y);
     context.closePath();
     context.stroke();
  }
  if(curTool == "pencil") {
    context.globalAlpha = 0.4;
    context.drawImage(crayonTextureImage, 0, 0, mainCanvas.width, mainCanvas.height);
  }
  context.globalAlpha = 1;

  saveDrawing()
}

function clearCanvas() {
	context.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
}

function unDo() {
	for (i=(pointsDrawn.length - 1);i>= 0;i--) {
		if (pointsDrawn[i]["dragged?"] == false) {
			unDoPointStore.push(pointsDrawn.pop())
			break
		}
		unDoPointStore.push(pointsDrawn.pop())
	}
	redraw()
}

function reDo() {
	for (i=(unDoPointStore.length - 2);i>= 0;i--) {
		if (unDoPointStore[i]["dragged?"] == false) {
			pointsDrawn.push(unDoPointStore.pop())
			break
		}
		pointsDrawn.push(unDoPointStore.pop())
	}
	redraw()

}

function clearDrawing() {
	pointsDrawn.length = 0
}

function saveDrawing() {
	var imgdata = canvas.toDataURL('image/png');
	var newdata = imgdata.replace(/^data:image\/png/,'data:application/octet-stream');    
	$('#save').find('a').attr('download','drawwithme.png').attr('href',newdata);
}