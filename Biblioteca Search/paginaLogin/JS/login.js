const API_BASE_URL = 'http://localhost:8080/api';
let backendOnline = false;

// Verifica se backend está online
async function verificarBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`);
        backendOnline = response.ok;
        console.log(backendOnline ? 'Backend conectado' : '❌ Backend não responde');
        return backendOnline;
    } catch (error) {
        console.log('Backend offline - usando modo de teste');
        backendOnline = false;
        return false;
    }
}

// Função principal de login
async function fazerLogin(event) {
    if (event) event.preventDefault();
    
    const login = document.getElementById('email').value; // Note: usando como login
    const senha = document.getElementById('password').value;
    const mensagemDiv = document.getElementById('mensagem');
    const submitBtn = document.getElementById('submit-btn');
    
    if (!login || !senha) {
        mostrarMensagem('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';
    
    try {
        let resultado;
        
        if (backendOnline) {
            resultado = await loginComBackend(login, senha);
        } else {
            resultado = loginTeste(login, senha);
        }
        
        if (resultado.success) {
            mostrarMensagem('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'sucessful.html';
            }, 1000);
        } else {
            mostrarMensagem(resultado.message || 'Credenciais inválidas', 'error');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro de conexão. Tentando modo teste...', 'error');
        
        const resultadoTeste = loginTeste(login, senha);
        if (resultadoTeste.success) {
            mostrarMensagem('Login teste realizado!', 'success');
            setTimeout(() => {
                window.location.href = 'sucessful.html';
            }, 1000);
        }
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Entrar';
    }
}

// Login com backend
async function loginComBackend(login, senha) {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login,  // Agora usando 'login' em vez de 'email'
            senha: senha   // Agora usando 'senha' em vez de 'password'
        })
    });
    
    if (!response.ok) {
        return { 
            success: false, 
            message: 'Erro no servidor'
        };
    }
    
    return await response.json();
}

// Modo teste
function loginTeste(login, senha) {
    const usuariosTeste = [
        { login: 'admin', senha: 'admin123' },
        { login: 'usuario1', senha: 'senha1' },
        { login: 'admin2', senha: 'admin456' }
    ];
    
    const usuarioValido = usuariosTeste.find(user => 
        user.login === login && user.senha === senha
    );
    
    return usuarioValido ? 
        { success: true } : 
        { success: false, message: 'Login ou senha incorretos' };
}

// Resto do código permanece igual...
function mostrarMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `message ${tipo}`;
    mensagemDiv.style.display = 'block';
    
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de login carregada');
    verificarBackend();
    
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', fazerLogin);
    }
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                fazerLogin();
            }
        });
    }
});