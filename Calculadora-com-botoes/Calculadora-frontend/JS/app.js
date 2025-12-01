const displayInput = document.getElementById('displayInput');
const erroDiv = document.getElementById('erro');
const resultadoDiv = document.getElementById('resultado');

function adicionarAoDisplay(valor) {
    displayInput.value += valor;
}

function apagarUltimo() {
    displayInput.value = displayInput.value.toString().slice(0, -1);
}

function limparDisplay() {
    displayInput.value = '';
    erroDiv.textContent = '';
    resultadoDiv.textContent = '';
}

function calcular() {
    const expressao = document.getElementById("displayInput").value;
    
    const url = 'http://localhost:8080/calcular'; 

    const data = { expressao };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())  
    .then(data => {
        const erroDiv = document.getElementById("erro");
        const resultadoDiv = document.getElementById("resultado");

        if (data.erro) {
            erroDiv.textContent = data.erro; 
            resultadoDiv.textContent = '';  
        } else {
            resultadoDiv.textContent = 'Resultado: ' + data.resultado;  
            erroDiv.textContent = '';  
        }
    })
    .catch(error => {
        console.error('Erro de requisição:', error);
        document.getElementById("erro").textContent = 'Erro de conexão com o servidor';
        document.getElementById("resultado").textContent = '';
    });
}
