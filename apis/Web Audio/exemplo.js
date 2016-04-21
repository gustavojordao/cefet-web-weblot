var AudioContext = window.AudioContext ||
                    window.webkitAudioContext;
var context = new AudioContext();

var musica1 = context.createBufferSource();
var musica2 = context.createBufferSource();
var volume =  context.createGain();

var playing = false;

document.getElementById("play").addEventListener("click", function(){
  if(!playing){
    musica1 = context.createBufferSource();
    musica2 = context.createBufferSource();
    musica1.connect(volume);
    musica2.connect(volume);
    volume.connect(context.destination);


    carregaSom('musica.mp3', musica1);
    carregaSom('musica2.mp3', musica2);
    musica1.start();

    playing = true;
  } else {
    playing = false;
    musica1.stop();
  }
});




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
