$(function(){
    var bCanPreview = true; // can preview

    // create canvas and context objects
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');

    // drawing active image
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    }

    // select desired colorwheel
    var imageSrc = 'images/colorwheel3.png';
    image.src = imageSrc;

    $('#picker').mousemove(function(e) { // mouse move handler
        if (bCanPreview) {
            // get coordinates of current position
            var canvasOffset = $(canvas).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);

            // get current pixel
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;

            // update preview color
            var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
            var pixelColor = '#' + ('0000' + dColor.toString(16)).substr(-6);
            $('.preview').css('backgroundColor', pixelColor);
        }
    });
    $('#picker').click(function(e) { // click event handler
        bCanPreview = !bCanPreview;
    }); 
    $('.preview').click(function(e) { // preview click
        $('.colorpicker').toggle();
        bCanPreview = true;
    });
});