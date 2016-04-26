function init(){

    var widthTela = 800;
    var heightTela = 410;
    var heightJogador = 75;
    var widthJogador = 10;
    var raioBola = 10;
    var diamBola = 2*raioBola;
    var minDist = 2*widthJogador;

    var teclado = { upJog1: false, downJog1: false, upJog2: false, downJog2: false };
    var pause = true;
    var gol = false;

    function Jogador(x, cor){
        this.x = x;
        this.y = (heightTela - heightJogador)/2;
        this.cor = cor;
    }

    Jogador.prototype.desenha = function(){
        fundo.fillStyle = this.cor;
        fundo.fillRect(this.x, this.y, widthJogador, heightJogador);
    };

    function Bola(){
        this.x = widthTela/2;
        this.y = heightTela/2;
        this.vx = Math.pow(-1, Math.floor(Math.random()*2));
        this.vy = Math.pow(-1, Math.floor(Math.random()*2));
    }

    Bola.prototype.desenha = function(){
        fundo.beginPath();
            fundo.fillStyle = 'white';
            fundo.arc(this.x, this.y, raioBola, 0, 2*Math.PI, false);
            fundo.fill();
        fundo.stroke();
    }

    var canvas = document.getElementById('canvas');
    var fundo = canvas.getContext('2d');

    fundo.width = 800;
    fundo.height = 400;

    var jogador1 = new Jogador(0, "blue");
    var jogador2 = new Jogador(widthTela - widthJogador, "red");

    var bola = new Bola();

    function desenha(){
        fundo.clearRect(0, 0, widthTela, heightTela);

        jogador1.desenha();
        jogador2.desenha();
        bola.desenha();

        if(gol){
            fundo.font = "50px Verdana";
            fundo.fillText('Gooooool!', 275, 300);
        }
    }

    canvas.addEventListener('click',
        function(e){
            var mensagemInicial = document.getElementById('mensagem-inicial');
            mensagemInicial.classList.add('oculto');

            pause = false;
        }
    );

    window.setInterval(
        function(){
            if(pause === true)
                return;

            if(bola.x <= 0-diamBola){
                //Gol Jogador 2
                gol = true;
                window.setTimeout(
                    function(){
                        gol = false
                    },
                    3000
                );
                bola = new Bola();
            }
            else if(bola.x >= widthTela+diamBola){
                //Gol Jogador 1
                gol = true;
                window.setTimeout(
                    function(){
                        gol = false
                    },
                    3000
                );
                bola = new Bola();
            }
            else if(bola.x-raioBola >= 0 && bola.x-raioBola <= widthJogador){
                if(bola.y+raioBola >= jogador1.y && bola.y <= jogador1.y+heightJogador){
                    bola.vx = -bola.vx;
                }
            }
            else if(bola.x+raioBola >= widthTela-widthJogador && bola.x+raioBola <= widthTela){
                if(bola.y+raioBola >= jogador2.y && bola.y <= jogador2.y+heightJogador){
                    bola.vx = -bola.vx;
                }
            }

            if(bola.y-raioBola <= 0 || bola.y+raioBola >= heightTela){
                bola.vy = -bola.vy;
            }

            bola.x += minDist*bola.vx;
            bola.y += minDist*bola.vy;

            desenha();
        },
        200
    );

    window.setInterval(
        function(){
            if(pause === true)
                return;

            if(teclado.upJog1 === true){
                if(jogador1.y > 0)
                    jogador1.y--;
            }
            if(teclado.downJog1 === true){
                if(jogador1.y < heightTela - heightJogador)
                    jogador1.y++;
            }
            if(teclado.upJog2 === true){
                if(jogador2.y > 0)
                    jogador2.y--;
            }
            if(teclado.downJog2 === true){
                if(jogador2.y < heightTela - heightJogador)
                    jogador2.y++;
            }
        },
        1
    );

    window.addEventListener('keydown',
        function(e){
          if(pause === true)
              return;

            switch(e.keyCode){
                case 87: //W
                    teclado.upJog1 = true;
                    break;
                case 83: //S
                    teclado.downJog1 = true;
                    break;
                case 38: //CIMA
                    teclado.upJog2 = true;
                    break;
                case 40: //BAIXO
                    teclado.downJog2 = true;
                    break;
            }
        }
    );

    window.addEventListener('keyup',
        function(e){
            if(pause === true)
                return;

            switch(e.keyCode){
                case 87: //CIMA
                    teclado.upJog1 = false;
                    break;
                case 83: //BAIXO
                    teclado.downJog1 = false;
                    break;
                case 38: //CIMA
                    teclado.upJog2 = false;
                    break;
                case 40: //BAIXO
                    teclado.downJog2 = false;
                    break;
            }
        }
    );

}

init();
