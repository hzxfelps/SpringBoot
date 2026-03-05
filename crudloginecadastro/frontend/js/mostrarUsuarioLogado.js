 function mostrarUsuarioLogado() {
            const userInfo = document.getElementById('userInfo');
            const usuarioLogado = localStorage.getItem('usuarioLogado');
            
            if (usuarioLogado) {
                const usuario = JSON.parse(usuarioLogado);
                userInfo.innerHTML = `
                    <span class="user-name">👤 ${usuario.nome}</span>
                `;
            } else {
                // login page if isnt loged
                window.location.href = 'login2.html';
            }
        }

        // logout function
        function logout() {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'login.html';
        }

        // when page loaded show the function
        mostrarUsuarioLogado();