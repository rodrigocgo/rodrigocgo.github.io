let bCriouMaze        = false;
let bTimeoutMAze      = false;
let bStartouGame      = false;
let bSaiuMaze         = false;
let bClicou           = false;
let bChegouPFinal     = false;
let bClicouCaixaFinal = false;
let bEncontrouPadrao  = false;
let bCriouDesafio02 = false;
let bCriouDesafio01 = false;
let bDesafioFinal = false;

AFRAME.registerComponent("image-switcher", {
   init: function () {
      this.currentImage = 1;
      this.switchImages = this.switchImages.bind(this);
      this.switchImages();
   },
   switchImages: function () {
      if (this.currentImage === 1) {
         this.el.setAttribute("src", "#seta-azul");
         this.currentImage = 2;
      } else {
         this.el.setAttribute("src", "#seta-vermelho");
         this.currentImage = 1;
      }
      setTimeout(this.switchImages, 1000);
   },
});

function StartGame() {
   escreveBoardLetraMenor("Clique na tela para começar");
   
   document.addEventListener('click', function(event) {
      if (!bClicou) {
         bClicou = true;
         initGame();
         contadorMaze();
      }
    });
}

function Desafio01SOM(){
   var som = new Howl({
      src: ['assets/sound/desafio_01.mp3']
  });
  som.play();
}

function Desafio02SOM(){
   var som = new Howl({
      src: ['assets/sound/desafio_02.mp3']
  });
  som.play();
}

function Escapar90sSOM(){
   
 
      var som = new Howl({
         src: ['assets/sound/90s_escapar.mp3']
     });
     som.play();
   
}

function EscadaSecretaSOM(){
   
  
      var som = new Howl({
         src: ['assets/sound/parabens_escada.mp3']
     });
     som.play();
   
}

function TempoAcabouSOM(){
 
      var som = new Howl({
         src: ['assets/sound/time_over.mp3']
     });
     som.play();
   
}

function SubiuEscadaSOM(){
   
      var som = new Howl({
         src: ['assets/sound/subiu_escada.mp3']
     });
     som.play();
   
}


function initGame(){
   
   var attr_text = 6;

   musicaAmbiente();
   Escapar90sSOM();
   
   setTimeout(function() {

      escreveBoard("Se prepare!")
      
      const idInterval = setInterval(function(){
      
      if (bStartouGame){
         
         CriaLabirinto();
         clearInterval(idInterval);
         RemoveCaixasBloqueio();
         MostraSetaFlag();
      }  
        attr_text--;
        
        if (attr_text == 0)
        {
           bStartouGame = true;
           escreveBoard("CORRA");
          
           
        }
        else if (attr_text > 0)
        {
          SomCount(); 
          escreveBoard(attr_text)
        }      

      }, 1000);


    }, 2000); // Inicia o contador depois de 5 segundos

}

function RemoveMaze(){
   removeByID("maze1");
}

function RemoveCaixasBloqueio(){
   removeByID("caixas-bloqueio");
}

function removeByID(id)
{
   var cena = document.getElementById("labirinto");
   var bloqueios = document.getElementById(id);
   cena.removeChild(bloqueios);
}

function musicaAmbiente(){
   var som = new Howl({
      src: ['assets/sound/maze_ost.mp3'],
      loop:'true',
      volume:0.3
  });
  som.play();
}

function SomCount(){
   var som = new Howl({
      src: ['assets/sound/count.mp3']
  });
  som.play();
}

function SomWin(){
   var som = new Howl({
      src: ['assets/sound/win.mp3']
  });
  som.play()
}

function SomFinal(){
   var som = new Howl({
      src: ['assets/sound/final_som.mp3']
  });
  som.play()
}

function contadorMaze(){
   var seconds = 0;

   setTimeout(function() {
      var board = document.getElementById('board');
      board.setAttribute('value','');
      board.setAttribute('position','0 2 -2.72518');
      board.setAttribute('scale','3 3 3');


      const idInterval = setInterval(function(){
         var attr_text = board.getAttribute('value');
         
         if(bTimeoutMAze || bSaiuMaze){
            clearInterval(idInterval);
            RemoveMaze();
            tempoEsgotado();
         } 

        attr_text = seconds++;
        
        if (attr_text == 90 && !bSaiuMaze)
        {
           bTimeoutMAze = true;
           return;
        }
        else if (attr_text < 90 && !bSaiuMaze)
          escreveBoard(attr_text);

      }, 1000);
    }, 8000); // Inicia o contador depois de 5 segundos

}

function escreveBoard(texto){
   var board = document.getElementById('board');
   board.setAttribute('value',texto)
}

function escreveBoardLetraMenor(texto){
   var board = document.getElementById('board');
   board.setAttribute('value',texto)
   board.setAttribute('scale',"1.5 1.5 1.5")
}

function tempoEsgotado(){
   if(bTimeoutMAze)
   {
      escreveBoard("TEMPO EGOSTADO")

      setTimeout(function() {
         escreveBoardLetraMenor("Encoste na Bandeira");
         visibleObj('compass-arrow','false');
         visibleObj('plataforma','false');
      },5000);
   }
}

function RegistraPuloTeclaEspaco(){
   document.addEventListener("keydown", function(event) {
      if (event.keyCode == 32) { // barra de espaço
        var playerEl = document.querySelector("#player");
        playerEl.setAttribute("velocity", {x: 0, y: 15, z: 0});
      }
    });
}

function visibleObj(id,attr){
   var obj = document.getElementById(id);
   obj.setAttribute('visible',attr)
}

function MensagemComTimeout(str1,str2,timeout){
   
   escreveBoardLetraMenor(str1);

   setTimeout(function() {
      escreveBoardLetraMenor(str2);
   },timeout);
}

function MensagemChegada(bTimeoutMAze)
{
  if (bTimeoutMAze)
  {
    escreveBoardLetraMenor("Suba na escada!");
    TempoAcabouSOM();
  }
  else
  {
    MensagemComTimeout("Parabens","Suba na escada!",2000);
    EscadaSecretaSOM();
  }

}

function EventoChegada(){
   
   const chegadaEl = document.getElementById('flag');

   // Adiciona um ouvinte de eventos de colisão à entidade do jogador
   chegadaEl.addEventListener('collide', function(e) {
     
      // Verifica se a entidade colidida é a imagem de chegada
      MensagemChegada(bTimeoutMAze);

     visibleObj('compass-arrow','false');
     visibleObj('plataforma','false');

     SomWin();
     removeByID('flag');
     
     bSaiuMaze = true;
     trocaAmbieite();

     setTimeout(function() {
      
      visibleObj('plataforma-final','true');
      visibleObj('escada','true');
      criaCaixaAleatoria();
      criaCaixaAleatoria();

     },2500);
   
   });
   
}

function pltFinal(e){
  
   SomWin();
   Desafio01SOM();
   e.target.removeEventListener('collide',pltFinal);
   setTimeout(function(){
      Desafio1Timeout();
      escreveBoardLetraMenor("Pule na cor que voce ache a correta!");
   },5000);    

}

function PlatataformaFinalCollide(){

   const pFinal = document.getElementById('plataforma-final');
   pFinal.addEventListener('collide',pltFinal);
}


function MostraSetaFlag(){
   visibleObj('compass-arrow','true');
   visibleObj('flag','true');
}

function RemoveAnimacaoCaixaFinal(objCaixa){

  if (bClicouCaixaFinal) return;
   // obtém todas as animações dentro do elemento a-box
  const animacoes = objCaixa.querySelectorAll('a-animation');

  // remove cada animação, exceto a animação de rotação
  animacoes.forEach(animacao => {
    if (animacao.getAttribute('attribute') !== 'rotation') {
      animacao.parentNode.removeChild(animacao);
    }
  });

  bClicouCaixaFinal = true;
}

function Transporta5Segundos(){
   setTimeout(function() {
      window.location.href = "memory.html";
    },10000);
}

function TrocaCorCaixa() {
   
   const caixaFinal = document.querySelector('#caixa-final');
 
   const cores = ['blue', 'green', 'red', 'yellow', 'black', 'white', 'pink'];
 
   RemoveAnimacaoCaixaFinal(caixaFinal);
 
   // seleciona uma cor aleatória do vetor de cores
   const cor = cores[Math.floor(Math.random() * cores.length)];
 
   if (cor === 'green') {
     
      // exibe mensagem de padrao encontrado
     escreveBoardLetraMenor("Voce sera transportado!");
     
     // remove o eventListener se a cor for verde
     caixaFinal.removeEventListener('click', TrocaCorCaixa);
     
     caixaFinal.setAttribute('color', cor);
     Transporta3Segundos();

   } else {
     // altera a cor da caixa final para a cor selecionada
     caixaFinal.setAttribute('color', cor);
   }
 }
 
 function eventoCliqueCaixaFinal() {
   const caixaFinal = document.querySelector('#caixa-final');

   // adiciona ou remove o eventListener de acordo com o valor da variável bEncontrouPadrao
   if (bEncontrouPadrao) {
     caixaFinal.removeEventListener('click', TrocaCorCaixa);
   } else {
     caixaFinal.addEventListener('click', TrocaCorCaixa);
   }
 };

 function trocaAmbieite(){
  const env = document.getElementById('env');
  env.setAttribute('environment','preset: tron');

 }

function CriaLabirinto(){
   const cena = document.querySelector('#labirinto');
   const novaMaze = document.createElement('a-entity');
   novaMaze.setAttribute('id', 'maze1');
   novaMaze.setAttribute('maze', 'size: 12 12; wall: #wall-one; cap: #end-cap 0.4; open: E 0 2 7 5 ;');
   novaMaze.setAttribute('position', '-10 0 0');
   novaMaze.setAttribute('rotation', '0 0 0');    
   cena.appendChild(novaMaze);
}



 function criaCaixaAleatoria() {

   // Gera posições aleatórias para x, y e z
   const x = Math.floor(Math.random() * 20) - 10;
   const y = Math.floor(Math.random() * 5) + 2.5;
   const z = Math.floor(Math.random() * 20) - 10;
 
   // Cria uma nova entidade para a caixa
   const cena = document.querySelector('#labirinto');
   const novaCaixa = document.createElement('a-box');
   novaCaixa.setAttribute('color', 'red');
   novaCaixa.setAttribute('position', `${x} ${y} ${z}`);
   novaCaixa.setAttribute('collider','type: box;');
   novaCaixa.setAttribute('dynamic-body','');

   cena.appendChild(novaCaixa);
 }

 function criaNumeroAuxiliar(x, z, text) {
   const textEl = document.createElement('a-text');
   const posicoes = `${x} 11.8 ${z}`;
;
   textEl.setAttribute('position', posicoes);

 
   textEl.setAttribute('value', text);
   textEl.setAttribute('color', 'pink');
   textEl.setAttribute('align', 'center');
   textEl.setAttribute('scale', '10 10 10');
   textEl.setAttribute('rotation','0 90 0');
 
   return textEl;
 }

 function DevolvePlataforma(cor,x,z,bStatico){
   const plataforma = document.createElement('a-box');
   var posicoes = x + " 9.8 " + z; 

   plataforma.setAttribute('color',cor);
   plataforma.setAttribute('depth',0.25);
   plataforma.setAttribute('height',2);
   plataforma.setAttribute('width',2);
   plataforma.setAttribute('rotation','-90 0 0');
   plataforma.setAttribute('position',posicoes);

   if(bStatico)
     plataforma.setAttribute('static-body','');
   

   return plataforma;
 }

 function RemoveObj(obj){
   const cena = document.querySelector('#labirinto');
   cena.removeChild(obj);
 }

 function ApendaObj(obj){
   const cena = document.querySelector('#labirinto');
   cena.appendChild(obj);
 }

 function criaPlataformaFinal(){
    
   var plat = DevolvePlataforma('yellow',76,-5,true)
   plat.addEventListener('collide',function(){
      escreveBoardLetraMenor("Voce sera transportado!");
      SomFinal();
      Transporta5Segundos();
   
    });

   ApendaObj(plat);    
}

 function FinalDesafio02(e){

   const text = document.getElementById('textAux');
   RemoveObj(text)
   SomWin();
   criaPlataformaFinal();
   e.target.removeEventListener('collide', FinalDesafio02);
 }

 function CriaCaixaDesafio02(){
  
   
   var text1 = criaNumeroAuxiliar(78,-4,"8");
   var text2 = criaNumeroAuxiliar(78, 1,"16");
   var text3 = criaNumeroAuxiliar(78,-9,"6");
   
   text1.setAttribute("id","textAux");
   text2.setAttribute("id","textAux");
   text3.setAttribute("id","textAux");

   const caixaPrincipal = DevolvePlataforma('red',80,-5,true);
   ApendaObj(DevolvePlataforma('red',80,-9,false));
   ApendaObj(DevolvePlataforma('red',80,-1,false));
   ApendaObj(caixaPrincipal);
   
   ApendaObj(text1);
   ApendaObj(text2);
   ApendaObj(text3);

   caixaPrincipal.addEventListener('collide',FinalDesafio02);

}


function ChamaDesafio02(e){
   SomWin();
   e.target.removeEventListener('collide', ChamaDesafio02);
   Desafio02SOM();
   escreveBoardLetraMenor("");

   setTimeout(function(){
      CriaCaixaDesafio02();
      escreveBoardLetraMenor("2..3..5..?..12");
   
   },7000);
   
   
}

 function Desafio1Timeout(){
    setTimeout(CriaCaixaDesafio01(),7000);
 }

 function CriaCaixaDesafio01(){
   const caixaPrincipal = DevolvePlataforma('green',85,-9,true);
   
   ApendaObj(DevolvePlataforma('red',85,-5,false));
   ApendaObj(DevolvePlataforma('blue',85,-1,false));
   ApendaObj(caixaPrincipal);   
   caixaPrincipal.addEventListener('collide',ChamaDesafio02);
}


document.addEventListener('DOMContentLoaded', function () {
   PlatataformaFinalCollide();
   EventoChegada();
   RegistraPuloTeclaEspaco();
   StartGame();
   eventoCliqueCaixaFinal();
});
