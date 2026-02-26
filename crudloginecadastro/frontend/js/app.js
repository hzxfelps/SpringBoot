document.getElementById('registroForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const perfil = document.getElementById('perfil').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;

    let resultado = 0;
    let erro = 0;


    try {
        const response = await fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                perfil: perfil,
                endereco: endereco,
                bairro: bairro,
                complemento: complemento,
                cep: cep,
                cidade: cidade,
                estado: estado

            })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

      if (data.erro) {
            document.getElementById('erro').textContent = data.erro;
        } else {
            document.getElementById('resultado').textContent = 'Usuário cadastrado com sucesso!';
        }

    } catch (err) {
        document.getElementById('erro').textContent = 'Erro ao processar a requisição' + err.message;
    }
});

/* const form = document.getElementById('registroForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value,
        perfil: document.getElementById('perfil').value,
        endereco: document.getElementById('endereco').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        complemento: document.getElementById('complemento').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim()
    };

    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        mensagem.innerHTML = '<span class="sucesso">Usuário cadastrado com sucesso!</span>';
        form.reset();
    })
    .catch(() => {
        mensagem.innerHTML = '<span class="erro">Erro ao cadastrar usuário.</span>';
    });
}); */