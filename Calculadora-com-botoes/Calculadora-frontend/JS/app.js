const displayInput = document.getElementById('displayInput');
const erroDiv = document.getElementById('erro');
const resultadoDiv = document.getElementById('resultado');

// Adiciona as fita no displayu
function adicionarAoDisplay(valor) {
    displayInput.value += valor;
}

// Delete esquisito
function apagarUltimo() {
    displayInput.value = displayInput.value.toString().slice(0, -1);
}

// Limpa tela sem spray
function limparDisplay() {
    displayInput.value = '';
    erroDiv.textContent = '';
    resultadoDiv.textContent = '';
}

function calcular() {
    const expressao = displayInput.value.trim();
    
    //ve se tem alguma fita
    if (!expressao) {
        erroDiv.textContent = 'Digite uma expressão';
        return;
    }
    
    fetch('/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `expressao=${encodeURIComponent(expressao)}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro no servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.erro) {
            erroDiv.textContent = data.erro;
            resultadoDiv.textContent = '';
        } else {
            resultadoDiv.textContent = 'Resultado: ' + data.resultado;
            erroDiv.textContent = '';
        }
    })
    .catch(error => {
        erroDiv.textContent = 'Erro de conexão: ' + error.message;
        resultadoDiv.textContent = '';
    });
}


/*document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacao = document.getElementById("operacao").value;

    let resultado = 0;
    let erro = 0;

    try {
        const response = await fetch("http://localhost:8080/calcular", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
                //application/x-www-form-urlencoded
            },
            body: new URLSearchParams({
                num1,
                num2,
                operacao
            })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        if (data.erro) {
            document.getElementById('erro').textContent = data.erro;
        } else {
            document.getElementById('resultado').textContent = data.resultado;
        }

    } catch (err) {
        document.getElementById('erro').textContent = 'Erro: ' + err.message;
    }
});*/
/*
switch (operacao) {
    case "somar":
        resultado = num1 + num2;
        break;
    case "subtrair":
        resultado = num1 - num2;
        break;
    case "multiplicar":
        resultado = num1 * num2;
        break;
    case "dividir":
        if (num2 == 0) {
            erro = "Não é possível dividir por zero!";
        } else {
            resultado = num1 / num2;
        }
        break;
    default:
        erro = "Operação inválida!";
}


if (erro == 0) {
    document.getElementById("resultado").textContent = resultado;
} else {
    document.getElementById("erro").textContent = erro;
}
})
*/