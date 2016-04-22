var AudioContext = window.AudioContext ||
                    window.webkitAudioContext;
var context = new AudioContext();



var musica1 = context.createBufferSource();
var musica2 = context.createBufferSource();

var filtromix1   = context.createGain();
var filtromix2   = context.createGain();

var dropbass  = context.createBiquadFilter();
  //Definindo o tipo do filtro como passa baixas
dropbass.type = 'lowpass';
  //Definindo limite do filtro
dropbass.frequency.value = 440;

var volume  = context.createGain();

var playing = false;

var input1 = document.getElementById('track1');
var input2 = document.getElementById('track2');


document.getElementById("play").addEventListener("click", function(){
  if(!playing){
    musica1 = context.createBufferSource();
    musica2 = context.createBufferSource();

    musica1.connect(filtromix1);
    musica2.connect(filtromix2);

    musica1.path = "tracks/" + input1.value + ".mp3";
    musica2.path = "tracks/" + input2.value + ".mp3";

    filtromix1.connect(volume);
    filtromix2.connect(volume);

    volume.connect(context.destination);

    carregaSom(musica1.path, musica1);
    carregaSom(musica2.path, musica2);

    filtromix1.gain.value = 1;
    filtromix2.gain.value = 0;

    musica1.start();
    musica2.start();
    playing = true;
  } else {
    musica1.stop();
    musica2.stop();
    playing = false;
  }
});




//Funcao para interpolar as 2 musicas
crossfade = function(element) {
  var x = parseInt(element.value) / parseInt(element.max);
  console.log(element.value+ "  " + x);
  // Use an equal-power crossfading curve:
  var gain1 = Math.cos(x * 0.5*Math.PI);
  var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);

  console.log("Gain1: " + gain1 + "  Gain2: " + gain2);
  filtromix1.gain.value = gain1;
  filtromix2.gain.value = gain2;
};


//Funcao de controle de volume
volume.changeVolume = function(element) {
  var fraction = parseInt(element.value) / parseInt(element.max);
  //Uso de aumento de volume quadratico
  console.log(fraction*fraction);
  volume.gain.value = fraction * fraction;
};




//Funcao para carregar novos sons atraves de um caminho
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
