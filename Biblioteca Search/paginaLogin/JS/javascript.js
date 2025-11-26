// Dados dos livros baseados no seu SQL
const livros = [
    { 
        codigo: 1001,
        titulo: "Tokyo Ghoul", 
        autor: "Sui Ishida", 
        outrosAutores: null,
        anoEdicao: 2011,
        tipoAcervo: "Manga",
        codEditora: 1,
        categoria: 1,
        numTombo: 1001
    },
    { 
        codigo: 1002,
        titulo: "Kagurabachi", 
        autor: "Tatsuya Endo", 
        outrosAutores: null,
        anoEdicao: 2023,
        tipoAcervo: "Manga",
        codEditora: 2,
        categoria: 1,
        numTombo: 1002
    },
    { 
        codigo: 1003,
        titulo: "Blue Lock", 
        autor: "Muneyuki Kaneshiro", 
        outrosAutores: null,
        anoEdicao: 2018,
        tipoAcervo: "Manga",
        codEditora: 3,
        categoria: 1,
        numTombo: 1003
    },
    { 
        codigo: 1004,
        titulo: "Naruto", 
        autor: "Masashi Kishimoto", 
        outrosAutores: null,
        anoEdicao: 1999,
        tipoAcervo: "Manga",
        codEditora: 4,
        categoria: 1,
        numTombo: 1004
    },
    { 
        codigo: 1005,
        titulo: "Attack on Titan", 
        autor: "Hajime Isayama", 
        outrosAutores: null,
        anoEdicao: 2009,
        tipoAcervo: "Manga",
        codEditora: 5,
        categoria: 1,
        numTombo: 1005
    }
];

// Mostra os livro
function carregarLivros() {
    const grid = document.getElementById('livrosGrid');
    
    grid.innerHTML = livros.map(livro => `
        <div class="livro-card">
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.anoEdicao}</p>
            <p><strong>Tipo:</strong> ${livro.tipoAcervo}</p>
            <span class="categoria">Código: ${livro.codigo}</span>
        </div>
    `).join('');
}

// Procura
function pesquisarLivros() {
    const termo = document.getElementById('searchInput').value.toLowerCase().trim();
    //colocar tolowercase e trim para tirar espaços e deixar tudo em imnusculo
    const resultadoDiv = document.getElementById('resultadoPesquisa');
    //pega div para mostrar os resultados
    
    if (!termo) {
        //caba tem q pesquisar alguma coisa
        resultadoDiv.innerHTML = '<p>Digite algo para pesquisar.</p>';
        resultadoDiv.style.display = 'block';
        return;
    }
    
    const livrosEncontrados = livros.filter(livro => 
        //filter percorre o array; for nao deu certo
        livro.titulo.toLowerCase().includes(termo) || 
        livro.autor.toLowerCase().includes(termo) ||
        livro.tipoAcervo.toLowerCase().includes(termo) ||
        livro.anoEdicao.toString().includes(termo)
        //ve se o bagulho pesquisado ta em ALGUMA coisa do livro, tipo autor
    );
    
    if (livrosEncontrados.length > 0) {
        //se achou o livro mostra o n° de livros encontrados e converte tudo pro html
        resultadoDiv.innerHTML = `
            <h3>Mangás encontrados: ${livrosEncontrados.length}</h3>
            ${livrosEncontrados.map(livro => `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <strong>${livro.titulo}</strong> - ${livro.autor}
                    <span style="background: #3498db; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px; margin-left: 10px;">
                        ${livro.anoEdicao}
                    </span>
                    <br>
                    <small>Código: ${livro.codigo} | Tombo: ${livro.numTombo}</small>
                </div>
            `).join('')}
        `;
    } else {
        resultadoDiv.innerHTML = `<p>Nenhum mangá encontrado para "${termo}".</p>`;
    }
    
    resultadoDiv.style.display = 'block';
}

// Enter pra pesquisa
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        pesquisarLivros();
    }
});

//pagina abre elivro aparece
window.onload = carregarLivros;