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
    
    if (compararCores(caixa1.getAttribute('color'), padrao[0]) && compararCores(caixa2.getAttribute('color'), padrao[1]) && compararCores(caixa3.getAttribute('color'), padrao[2])) {
        titulo.setAttribute('value', 'Voce Acertou!');

    } else {
        titulo.setAttribute('value', 'As cores nao correspondem!');

    }
}

function atualizarContagemRegressiva(tempoRestante) {
    const titulo = document.querySelector('#titulo');
    titulo.setAttribute('value', `Tempo restante: ${tempoRestante}s`);
}


document.addEventListener('DOMContentLoaded', function () {
    
    // Atribuir o valor do texto "Jogo da Memória"
    
    
    // encontrar as referências das caixas
    caixa1 = document.querySelector('#caixa1');
    caixa2 = document.querySelector('#caixa2');
    caixa3 = document.querySelector('#caixa3');
    btnIniciar = document.querySelector('#btn-iniciar');
    btnPausar = document.querySelector('#btn-pausar');

    // evento de clique nas caixas
    caixa1.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
        }
    });
    
    caixa2.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
        }
    });
    
    caixa3.addEventListener('click', function() {
        if (!caixasBloqueadas) {
            mudarCor(this);
        }
    });
    
    
    btnIniciar.addEventListener('click', function() {
        
        if (this.getAttribute('data-disabled') === 'true') {
            return;
        }
        
        titulo.setAttribute('value', 'REPITA AS CORES ACIMA');

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

        // aguardar alguns segundos antes de iniciar a jogada
        setTimeout(function() {
            // resetar as cores das caixas
            padraoCores.forEach((caixa, index) => {
                caixa.setAttribute('visible', false);
            });
    
            btnPausar.setAttribute('visible',true);
            caixasBloqueadas = false;

            // Dar ao usuário 30 segundos para clicar nas caixas
        let tempoRestante = 30;
        atualizarContagemRegressiva(tempoRestante);
        intervalo = setInterval(function() {
            tempoRestante--;
            atualizarContagemRegressiva(tempoRestante);

            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                caixasBloqueadas = true; 
                titulo.setAttribute('value', 'Tempo Esgostado!');
            }
        }, 1000); // Atualizar a cada 1 segundo

    
            // Dar ao usuário 30 segundos para clicar nas caixas
            setTimeout(function() {
                caixasBloqueadas = true;
            }, 30000); // 30 segundos
    
        }, 3000);
        
        btnPausar.setAttribute('data-disabled',false);
        
    });

    btnPausar.addEventListener('click', function() {
        console.log("teste");
    
        if (this.getAttribute('data-disabled') === 'true') {
            return;
        }

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
