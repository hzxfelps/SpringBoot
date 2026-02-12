fetch("http://localhost:8080/usuarios")
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById("tabelaUsuarios");

        data.forEach(usuario => {
            const linha = `
                <tr>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.perfil}</td>
                    <td>${usuario.endereco}</td>
                    <td>${usuario.bairro}</td>
                    <td>${usuario.complemento}</td>
                    <td>${usuario.cep}</td>
                    <td>${usuario.cidade}</td>
                    <td>${usuario.estado}</td>
                </tr>
            `;
            tabela.innerHTML += linha;
        });
    })
    .catch(error => console.error("Erro:", error));
