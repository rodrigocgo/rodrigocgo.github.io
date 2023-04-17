let bCriouMaze = false;

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

document.addEventListener('DOMContentLoaded', function () {
   const pilar = document.querySelector('#ground');
   const player = document.querySelector('#player');

   var seconds = 0;
   var counter;

   seconds = 0;
      counter = setInterval(function(){
        var board = document.getElementById('board');
        var attr_text = board.getAttribute('value');


        attr_text = seconds++;
        board.setAttribute('value',attr_text);
      },1000);
    


   pilar.addEventListener('collide', function (event) {
      if (!bCriouMaze){
         const cena = document.querySelector('#labirinto');
         const novaMaze = document.createElement('a-entity');
         novaMaze.setAttribute('id', 'maze1');
         novaMaze.setAttribute('maze', 'size: 10 10; wall: #wall-one; cap: #end-cap 0.4; open: E 0 2 7 5 ;');
         novaMaze.setAttribute('position', '-10 0 0');
         novaMaze.setAttribute('rotation', '0 0 0');    

         cena.appendChild(novaMaze);

         bCriouMaze = true;
      }
   });
});
