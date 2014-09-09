window.onload=function(){
	createCanvas(mainCanvas)
	bindListeners()
	createPencilGradient()
	updateCursor("\uf1fc")
};

var mainCanvas = {
	"width": "600px",
	"height": "450px"
}
var pointsDrawn = []
var	undoPointStore = []
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
		_.each(pointsDrawn, function(point){ point["stored?"] = true });
  	_.each(undoPointStore, function(point){ point["stored?"] = true });
		socket.emit('drawPoint', {"pointsDrawn": pointsDrawn, "undoPointStore": undoPointStore});
	});
}

function bindMouseLeave() {
	$('#canvas').mouseup(function(e){
  	paint = false;
		_.each(pointsDrawn, function(point){ point["stored?"] = true });
  	_.each(undoPointStore, function(point){ point["stored?"] = true });
		socket.emit('drawPoint', {"pointsDrawn": pointsDrawn, "undoPointStore": undoPointStore});
	});
}




function addClick(x, y, dragging) {
	pointsDrawn.push({"x": x,
										"y": y,
										"dragged?": dragging,
										"color": curColor,
										"size": curSize,
										"tool": curTool,
										"stored?": false})
}


function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.lineJoin = "round";
			

  for(i=0; i < pointsDrawn.length; i++) {		
  	context.beginPath();
  	if(pointsDrawn[i]["dragged?"] && i){
  		context.moveTo(pointsDrawn[i-1].x, pointsDrawn[i-1].y);
  	}
  	else{
  		context.moveTo(pointsDrawn[i].x-1, pointsDrawn[i].y);
  	}

  	context.strokeStyle = pointsDrawn[i].color
  	if(pointsDrawn[i].tool == "eraser") {
  		context.strokeStyle = "#fff"
  	}
  	if(pointsDrawn[i].tool == "pencil") {
      context.strokeStyle = grd;
  	}
  	
  	context.lineWidth = pointsDrawn[i].size
  	context.lineTo(pointsDrawn[i].x, pointsDrawn[i].y);
  	context.closePath();
  	context.stroke();
  }

  saveDrawing()
}

function clearCanvas() {
	context.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
}

function unDo() {
	for (i=(pointsDrawn.length - 1);i>= 0;i--) {
		if (pointsDrawn[i]["dragged?"] == false) {
			undoPointStore.push(pointsDrawn.pop())
			break
		}
		undoPointStore.push(pointsDrawn.pop())
	}
	_.each(pointsDrawn, function(point){ point["stored?"] = true });
  _.each(undoPointStore, function(point){ point["stored?"] = true });
	socket.emit('drawPoint', {"pointsDrawn": pointsDrawn, "undoPointStore": undoPointStore});
}

function reDo() {
	for (i=(undoPointStore.length - 2);i>= 0;i--) {
		if (undoPointStore[i]["dragged?"] == false) {
			pointsDrawn.push(undoPointStore.pop())
			break
		}
		pointsDrawn.push(undoPointStore.pop())
	}
	_.each(pointsDrawn, function(point){ point["stored?"] = true });
  _.each(undoPointStore, function(point){ point["stored?"] = true });
	socket.emit('drawPoint', {"pointsDrawn": pointsDrawn, "undoPointStore": undoPointStore});

}

function clearDrawing() {
	for (i=(pointsDrawn.length - 1);i>= 0;i--) {
		undoPointStore.push(pointsDrawn.pop())
	}
	pointsDrawn.length = 0
	_.each(pointsDrawn, function(point){ point["stored?"] = true });
  _.each(undoPointStore, function(point){ point["stored?"] = true });
	socket.emit('drawPoint', {"pointsDrawn": pointsDrawn, "undoPointStore": undoPointStore});
}

function saveDrawing() {
	var imgdata = canvas.toDataURL('image/png');
	var newdata = imgdata.replace(/^data:image\/png/,'data:application/octet-stream');    
	$('#save').find('a').attr('download','drawwithme.png').attr('href',newdata);
}

function createPencilGradient() {
	grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
	      
	grd.addColorStop(0, '#717574');
	for (i=1;i<49;i++) {
		grd.addColorStop(((i*0.02)-0.01),'#FFF');   
		
	}
	for (i=0;i<49;i++) {
		grd.addColorStop((i*0.02), 'rgba(113,117,116,.06');   
	}

	grd.addColorStop(1, '#717574');
}