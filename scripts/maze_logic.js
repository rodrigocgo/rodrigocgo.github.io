let bCriouMaze        = false;
let bTimeoutMAze      = false;
let bStartouGame      = false;
let bSaiuMaze         = false;
let bClicou           = false;
let bChegouPFinal     = false;
let bClicouCaixaFinal = false;
let bEncontrouPadrao  = false;

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


function initGame(){
   
   var attr_text = 6;
   
   
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

function SomCount(){
   var som = new Howl({
      src: ['assets/sound/count.mp3']
  });
  som.play()
}

function SomWin(){
   var som = new Howl({
      src: ['assets/sound/win.mp3']
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
        
        if (attr_text == 10 && !bSaiuMaze)
        {
           bTimeoutMAze = true;
           return;
        }
        else if (attr_text < 10 && !bSaiuMaze)
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
    escreveBoardLetraMenor("Suba na escada!");
  else
    MensagemComTimeout("Parabens","Suba na escada!",5000);

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
      //visibleObj('caixa-criativa','true');
      //visibleObj('esfera','true');
      //visibleObj('cone','true');
      //ObjetoFinaisCaindo();
      criaCaixaAleatoria();
      criaCaixaAleatoria();

     },2500);
   
   });
   
}

function PlatataformaFinalCollide(){

   const pFinal = document.getElementById('plataforma-final');

   pFinal.addEventListener('collide',function(e){
    
      if (!bChegouPFinal)
        escreveBoardLetraMenor("Descubra o segredo da caixa colorida");

      bChegouPFinal = true;
   });

}

function ObjetoFinaisCaindo(){
  var caixa =  document.querySelector('#caixa-criativa');
  var cone =  document.querySelector('#cone');
  var esfera =  document.querySelector('#esfera');
  
  caixa.setAttribute('dynamic-body','');
  cone.setAttribute('dynamic-body','');
  esfera.setAttribute('dynamic-body','');
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

function Transporta3Segundos(){
   setTimeout(function() {
      window.location.href = "memory.html";
    },3000);
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
   novaMaze.setAttribute('maze', 'size: 10 10; wall: #wall-one; cap: #end-cap 0.4; open: E 0 2 7 5 ;');
   novaMaze.setAttribute('position', '-10 0 0');
   novaMaze.setAttribute('rotation', '0 0 0');    
   cena.appendChild(novaMaze);
}


function mudarCena() {
   // seleciona a tag a-scene atual
   const cenaAtual = document.querySelector('#labirinto');
 
   // define a cena desejada como o novo valor do atributo 'src' da tag a-scene
   cenaAtual.setAttribute('src', "index.html");

   console.log("teste")
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

document.addEventListener('DOMContentLoaded', function () {
   PlatataformaFinalCollide();
   EventoChegada();
   RegistraPuloTeclaEspaco();
   StartGame();
   eventoCliqueCaixaFinal();

});
