
var video = document.querySelector("#webcam");
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
    if (localMediaStream) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

function onLoad () {
	if(!hasGetUserMedia() || !hasURL()) {
		alert("Este navegador nao suporta getUserMedia()");
	}
	else {
	navigator.getUserMedia(
		{
	    	video : true
	    }, function(stream) {
		        video.src = window.URL.createObjectURL(stream);
		        localMediaStream = stream;
	        }, error);
	}
}

function hasGetUserMedia () {
	navigator.getUserMedia = navigator.getUserMedia || //opera
	navigator.webkitGetUserMedia || //chrome, safari
	navigator.mozGetUserMedia || //Mozilla nightly
	navigator.msGetUserMedia;
	if(navigator.getUserMedia) {
		return true;
	}
	return false;
}

function hasURL () {
	window.URL = window.URL || window.webkitURL
	|| window.mozURL || window.msURL;
	if(window.URL && window.URL.createObjectURL) {
		return true;
	}
	return false;
}

function error(e) {
	alert("Erro na aplicação. "+e);
}


/*Referencia para uso do canvas*/
/*https://msdn.microsoft.com/pt-br/library/hh580308%28v=vs.85%29.aspx*/
function saveCanvas() {
	window.localStorage.canvasImage = canvas.toDataURL(); // Save the user's drawing to persistent local storage.
} // saveCanvas

function eraseCanvas() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
} // eraseCanvas

function loadCanvas() {
	var img = new Image(); // The canvas drawImage() method expects an image object.

	img.src = window.localStorage.canvasImage; // Retrieve the last saved artistic achievement from persistent local storage.
	img.onload = function() { // Only render the saved drawing when the image object has fully loaded the drawing into memory.
	  context.drawImage(img, 0, 0); // Draw the image starting at canvas coordinate (0, 0) - the upper left-hand corner of the canvas.
	} // onload
}

//http://code.tutsplus.com/tutorials/getusermedia-using-the-media-capture-and-streams-api--cms-24784
// savePhoto() - Function invoked when user clicks on the canvas element
// 1. If msSaveBlob is supported, get the photo blob from the canvas and save the image file
// 2. Otherwise, set up the download attribute of the anchor element and download the image file
 
   var savePhoto = function() {
       if (photoReady) {
           var canvas = document.getElementById('canvas');
           if (navigator.msSaveBlob) {
               var imgData = canvas.msToBlob('image/jpeg');
               navigator.msSaveBlob(imgData, 'myPhoto.jpg');
           }
           else {
               var imgData = canvas.toDataURL('image/jpeg');
               var link    = document.getElementById('save');
               link.href   = imgData;
               link.download = 'myPhoto.jpg';
               link.click();
           }
           canvas.removeEventListener('click', savePhoto);
           document.getElementById('photoViewText').innerHTML = '';
           photoReady = false;
       }
   };

