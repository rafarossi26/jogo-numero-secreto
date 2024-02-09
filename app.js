let listaDeNumerosEscolhidos = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numeroTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);   
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroAleatorio =  parseInt(Math.random() * numeroLimite + 1);
    if (listaDeNumerosEscolhidos.length == numeroLimite) {
        listaDeNumerosEscolhidos = [];
    }
    if(listaDeNumerosEscolhidos.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosEscolhidos.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroSecreto > chute) {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }
        numeroTentativas++;
        limparCampo();
    } 
   
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    numeroTentativas = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}



