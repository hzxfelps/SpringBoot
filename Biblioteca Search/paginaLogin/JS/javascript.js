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
        categoriaNome: "Ação",
        numTombo: 1001,
        imagem: "imagens/tokyoghoul.jpg"
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
        categoriaNome: "Ação",
        numTombo: 1002,
        imagem: "imagens/kagurabachi.jpg"
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
        categoriaNome: "Ação",
        numTombo: 1003,
        imagem: "imagens/bluelock.jpg"
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
        categoriaNome: "Ação",
        numTombo: 1004,
        imagem: "imagens/naruto.jpg"
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
        categoriaNome: "Ação",
        numTombo: 1005,
        imagem: "imagens/aot.jpg"
    },

    { 
        codigo: 1006,
        titulo: "Orgulho e Preconceito", 
        autor: "Jane Austen", 
        outrosAutores: null,
        anoEdicao: 1813,
        tipoAcervo: "Livro",
        codEditora: 6,
        categoria: 2,
        categoriaNome: "Romance",
        numTombo: 1006,
        imagem: "imagens/orgulhoepreconceito.jpg"
    },
    { 
        codigo: 1007,
        titulo: "O Morro dos Ventos Uivantes", 
        autor: "Emily Brontë", 
        outrosAutores: null,
        anoEdicao: 1847,
        tipoAcervo: "Livro",
        codEditora: 7,
        categoria: 2,
        categoriaNome: "Romance",
        numTombo: 1007,
        imagem: "imagens/morroventosuivantes.jpg"
    },
    { 
        codigo: 1008,
        titulo: "Duna", 
        autor: "Frank Herbert", 
        outrosAutores: null,
        anoEdicao: 1965,
        tipoAcervo: "Livro",
        codEditora: 8,
        categoria: 3,
        categoriaNome: "Ficção",
        numTombo: 1008,
        imagem: "imagens/duna.jpg"
    },
    { 
        codigo: 1009,
        titulo: "1984", 
        autor: "George Orwell", 
        outrosAutores: null,
        anoEdicao: 1949,
        tipoAcervo: "Livro",
        codEditora: 9,
        categoria: 3,
        categoriaNome: "Ficção",
        numTombo: 1009,
        imagem: "imagens/1984.jpg"
    },
    {   
        codigo: 1010,
        titulo: "Dom Casmurro", 
        autor: "Machado de Assis", 
        outrosAutores: null,
        anoEdicao: 1899,
        tipoAcervo: "Livro",
        codEditora: 10,
        categoria: 4,
        categoriaNome: "Drama",
        numTombo: 1010,
        imagem: "imagens/domcasmurro.jpg"
    }
];

let categoriaAtiva = 'Todos';

function carregarLivros(livrosParaExibir = livros) {
    const grid = document.getElementById('livrosGrid');
    
    grid.innerHTML = livrosParaExibir.map(livro => `
        <div class="livro-card">
            <img src="${livro.imagem}" alt="${livro.titulo}" class="livro-imagem">
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.anoEdicao}</p>
            <p><strong>Tipo:</strong> ${livro.tipoAcervo}</p>
            <span class="categoria">${livro.categoriaNome}</span>
        </div>
    `).join('');
}

function pesquisarLivros() {
    const termo = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultadoDiv = document.getElementById('resultadoPesquisa');
    
    if (!termo) {
        resultadoDiv.innerHTML = '<p>Digite algo para pesquisar.</p>';
        resultadoDiv.style.display = 'block';
        return;
    }
    
    let livrosFiltrados = livros;
    if (categoriaAtiva !== 'Todos') {
        livrosFiltrados = livros.filter(livro => livro.categoriaNome === categoriaAtiva);
    }
    
    const livrosEncontrados = livrosFiltrados.filter(livro => 
        livro.titulo.toLowerCase().includes(termo) || 
        livro.autor.toLowerCase().includes(termo) ||
        livro.tipoAcervo.toLowerCase().includes(termo) ||
        livro.anoEdicao.toString().includes(termo)
    );
    
    if (livrosEncontrados.length > 0) {
        resultadoDiv.innerHTML = `
            <h3>Livros encontrados: ${livrosEncontrados.length}</h3>
            ${livrosEncontrados.map(livro => `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <strong>${livro.titulo}</strong> - ${livro.autor}
                    <span style="background: #3498db; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px; margin-left: 10px;">
                        ${livro.anoEdicao}
                    </span>
                    <br>
                    <small>Código: ${livro.codigo} | Tombo: ${livro.numTombo} | Categoria: ${livro.categoriaNome}</small>
                </div>
            `).join('')}
        `;
    } else {
        resultadoDiv.innerHTML = `<p>Nenhum livro encontrado para "${termo}".</p>`;
    }
    
    resultadoDiv.style.display = 'block';
}

function filtrarCategoria(categoria) {
    categoriaAtiva = categoria;
    
    document.querySelectorAll('.aba-link').forEach(aba => {
        if (aba.textContent === categoria) {
            aba.classList.add('active');
        } else {
            aba.classList.remove('active');
        }
    });
    
    let livrosFiltrados;
    if (categoria === 'Todos') {
        livrosFiltrados = livros;
    } else {
        livrosFiltrados = livros.filter(livro => livro.categoriaNome === categoria);
    }
    
    carregarLivros(livrosFiltrados);
    
    document.getElementById('resultadoPesquisa').style.display = 'none';
    document.getElementById('searchInput').value = '';
}

function criarAbas() {
    const abasContainer = document.getElementById('abasContainer');
    
    const categorias = ['Todos', ...new Set(livros.map(livro => livro.categoriaNome))];
    

    abasContainer.innerHTML = categorias.map(categoria => 
        `<button class="aba-link ${categoria === 'Todos' ? 'active' : ''}" onclick="filtrarCategoria('${categoria}')">${categoria}</button>`
    ).join('');
}

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        pesquisarLivros();
    }
});

window.onload = function() {
    criarAbas();
    carregarLivros();
};