var AudioContext = window.AudioContext ||
                    window.webkitAudioContext;

var context = new AudioContext();


var musica1 = context.createBufferSource();
var musica2 = context.createBufferSource();
var gain = context.createGain();


musica1.connect(gain);
musica2.connect(gain);
gain.connect(context.destination);


carregaSom('musica.mp3', musica1);
carregaSom('musica2.mp3', musica2);

musica1.start(context.currentTime);




function carregaSom(url, musiquinha) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      console.log(buffer);
      musiquinha.buffer = buffer;
    });
  }
  request.send();
}
