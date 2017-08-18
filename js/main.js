var canvasWidth = 490;
var canvasHeight = 220;
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;

function MainScript() {
    prepareCanvas();
}

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var paint;
var canvas;
var context;
var curColor = "#444444";
var curSize = "normal";

function prepareCanvas()
{
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    // Add mouse events
    // ----------------
    $('#canvas').mousedown(function(e)
    {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });

    $('#canvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e){
        paint = false;
        redraw();
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });

    $('#picker').mousemove(function(e){
        curColor = $('.preview').css('background-color'); });

    $('#chooseSmall').mousedown(function(e){
        curSize = "small";
    });
    $('#chooseNormal').mousedown(function(e){
        curSize = "normal";
    });
    $('#chooseLarge').mousedown(function(e){
        curSize = "large";
    });
    $('#chooseHuge').mousedown(function(e){
        curSize = "huge";
    });

    $('#clearCanvas').mousedown(function(e)
    {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clickColor = new Array();
        clickSize = new Array();
        clearCanvas();
    });
}

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
    clickSize.push(curSize);
}

function clearCanvas()
{
    context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redraw()
{
    clearCanvas();

    var radius;
    context.lineJoin = "round";


    for(var i=0; i < clickX.length; i++)
    {
        if(clickSize[i] == "small"){
            radius = 2;
        }else if(clickSize[i] == "normal"){
            radius = 5;
        }else if(clickSize[i] == "large"){
            radius = 10;
        }else if(clickSize[i] == "huge"){
            radius = 20;
        }

        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = radius;
        context.stroke();
    }
}

MainScript();

/**/