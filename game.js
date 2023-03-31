//terminou
let bTerminou= false;

//TempoRestante ou nivel
let tempoRestante = 10;
let nivel = 1;
let bPerdeu = false;

//erros
let numAcertos = 0;
let numErros = 0;

//som iniciado
let somIniciado = false;

//intervalo de tempo
let intervalo;

//bloqueio caixas
let caixasBloqueadas = true;

// cores disponíveis
const cores = ['red', 'green', 'blue'];

// padrão de cores
let padrao = [];

// referências das caixas
let caixa1, caixa2, caixa3;


  // função para mudar a cor da caixa clicada
  function mudarCor(caixa) {
    let corAtual = caixa.getAttribute('color');
    let indice = cores.indexOf(corAtual);

    if (indice < cores.length - 1) {
        indice++;
    } else {
        indice = 0;
    }

    caixa.setAttribute('color', cores[indice]);
}

function compararCores(cor1, cor2) {
    console.log("cor1 = " + cor1 + " cor2 = " + cor2)
    return cor1 === cor2;
}

function compararPadrao() {
    
    const titulo = document.querySelector('#titulo');
    
    if(bPerdeu)
    {
        titulo.setAttribute('value', 'TENTAR NOVAMENTE!');
        var som = new Howl({
            src: ['assets/sound/lose.mp3']
        });
        som.play();
        numErros++;
    }
    else if (compararCores(caixa1.getAttribute('color'), padrao[0]) && 
       compararCores(caixa2.getAttribute('color'), padrao[1]) && 
       compararCores(caixa3.getAttribute('color'), padrao[2])) {

        titulo.setAttribute('value', 'Voce Acertou!');
        var som = new Howl({
            src: ['assets/sound/win.mp3']
        });
        som.play();
        numAcertos++;
        tempoRestante--;
        nivel++;

        document.querySelector('#nivel').setAttribute('value', `NIVEL ${nivel}`);

    } else {
        titulo.setAttribute('value', 'PADRAO ERRADO!');
        var som = new Howl({
            src: ['assets/sound/lose.mp3']
        });
        som.play();
        numErros++;

    }

    document.querySelector('#placar-acertos').setAttribute('value', `ACERTOS ${numAcertos}`);
    document.querySelector('#placar-erros').setAttribute('value', `ERROS ${numErros}`);

    
   
}

function atualizarContagemRegressiva(tempoRestante) {
    const titulo = document.querySelector('#titulo');
    titulo.setAttribute('value', `RESOLVA ${tempoRestante}s`);
}

function audioBox(){
    var som = new Howl({
        src: ['assets/sound/box.mp3']
    });
    som.play();
}

document.addEventListener('DOMContentLoaded', function () {
    
    // Atribuir o valor do texto "Jogo da Memória"
    
    
    // encontrar as referências das caixas
    caixa1 = document.querySelector('#caixa1');
    caixa2 = document.querySelector('#caixa2');
    caixa3 = document.querySelector('#caixa3');
    btnIniciar = document.querySelector('#btn-iniciar');
    btnPausar = document.querySelector('#btn-pausar');
    document.querySelector('#nivel').setAttribute('value', `NIVEL ${nivel}`);

    // evento de clique nas caixas
    caixa1.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
            audioBox();
        }
    });
    
    caixa2.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
            audioBox();
        }
    });
    
    caixa3.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
            audioBox();
        }
    });
    
    
    btnIniciar.addEventListener('click', function() {
        bTerminou= true;
        bPerdeu = false;
        
          if (!somIniciado)
        {
          var som = new Howl({
             src: ['assets/sound/ambient.mp3']
            });
            som.play();

            somIniciado = true;
        }

        if (this.getAttribute('data-disabled') === 'true') {
            return;
        }

        var som = new Howl({
            src: ['assets/sound/btniniciar.mp3']
        });
        som.play();
        
        titulo.setAttribute('value', 'ATENCAO!');

        caixa1.setAttribute('color', 'grey');
        caixa2.setAttribute('color', 'grey');
        caixa3.setAttribute('color', 'grey');

        // gerar um novo padrão de cores
        padrao = [];
        for (let i = 0; i < 3; i++) {
            let indice = Math.floor(Math.random() * cores.length);
            padrao.push(cores[indice]);
        }
    
        // mostrar o padrão de cores
        const padraoCores = document.querySelectorAll('#default-Box');
        padraoCores.forEach((caixa, index) => {
            caixa.setAttribute('color', padrao[index]);
            caixa.setAttribute('visible', true);
        });

        this.setAttribute('visible',false);
        this.setAttribute('data-disabled',true);
        btnPausar.setAttribute('visible',false);
        btnPausar.setAttribute('data-disabled',true);

        caixasBloqueadas = true;

        // aguardar alguns segundos antes de iniciar a jogada
        setTimeout(function() {
            // resetar as cores das caixas
            padraoCores.forEach((caixa, index) => {
                caixa.setAttribute('visible', false);
            });
    
            btnPausar.setAttribute('visible',true);
            caixasBloqueadas = false;

            // Dar ao usuário 30 segundos para clicar nas caixas
        console.log(tempoRestante);
            let tempoAxu = tempoRestante;
        atualizarContagemRegressiva(tempoAxu);
        intervalo = setInterval(function() {
            tempoAxu--;
            atualizarContagemRegressiva(tempoAxu);

            if (tempoAxu <= 0) {
                clearInterval(intervalo);
                caixasBloqueadas = true; 
                console.log("bloqueou a caixa1")
                titulo.setAttribute('value', 'Tempo Esgostado!');
                bPerdeu = true;
          }
        }, 1000); // Atualizar a cada 1 segundo

    
            setTimeout(function() {
                if (bTerminou) return;

                caixasBloqueadas = true;
                console.log("bloqueou a caixa2")
            }, tempoRestante*1000); // 10 segundos
    
        }, 3000);
        
        btnPausar.setAttribute('data-disabled',false);
        
    });

    btnPausar.addEventListener('click', function() {
        bTerminou = true;
        caixasBloqueadas = true;
    
        if (this.getAttribute('data-disabled') === 'true') {
            return;
        }

        var som = new Howl({
            src: ['assets/sound/btniniciar.mp3']
        });
        som.play();

        clearInterval(intervalo);
        titulo.setAttribute('value', 'Memory Game');
    
        const padraoCores = document.querySelectorAll('#default-Box');
    
        padraoCores.forEach((caixa, index) => {
            caixa.setAttribute('color', padrao[index]);
            caixa.setAttribute('visible', true);
        });
    
        btnIniciar.setAttribute('visible', true);
        btnIniciar.setAttribute('data-disabled', false);
    
        this.setAttribute('visible', false);
        this.setAttribute('data-disabled', true);

        compararPadrao();
        
    });
    

    
});
