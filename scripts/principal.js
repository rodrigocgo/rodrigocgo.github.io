document.addEventListener('DOMContentLoaded', function () {

// Seleciona as entidades das pirâmides
var piramide1 = document.querySelector('#piramide1');
var piramide2 = document.querySelector('#piramide2');

var piramide3 = document.querySelector('#piramide3');
var piramide4 = document.querySelector('#piramide4');

console.log("teste")
// Alterna a cor das pirâmides a cada 1 segundo
setInterval(function() {
  // Alterna a cor da pirâmide 1
  if (piramide1.getAttribute('material').color == 'red') {
    piramide1.setAttribute('material', 'color', '#ffcc00');
    piramide2.setAttribute('material', 'color', '#ffcc00');
    
  } else {
    piramide1.setAttribute('material', 'color', 'red');
    piramide2.setAttribute('material', 'color', 'red');
  }

  // Alterna a cor da pirâmide 2
  if (piramide3.getAttribute('material').color == 'blue') {
    piramide3.setAttribute('material', 'color', '#ffcc00');
    piramide4.setAttribute('material', 'color', '#ffcc00');
  } else {
    piramide3.setAttribute('material', 'color', 'blue');
    piramide4.setAttribute('material', 'color', 'blue');
  }
}, 1000);

});
