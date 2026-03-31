const API = "http://localhost:8080/categorias";
let editandoId = null;

// LISTAR
async function carregarCategorias() {
  const res = await fetch(API);
  const data = await res.json();

  const container = document.getElementById("listaCategorias");
  container.innerHTML = "";

  data.forEach(cat => {
    container.innerHTML += `
      <div class="bg-zinc-900 p-6 rounded-2xl border border-white/10 hover:scale-[1.02] transition">

        <h4 class="text-lg font-semibold mb-4">${cat.nome}</h4>

        <div class="flex justify-between text-sm">

          <button onclick="editar(${cat.id}, \`${cat.nome}\`)"
            class="text-yellow-400 hover:underline">
            editar
          </button>

          <button onclick="excluir(${cat.id})"
            class="text-red-400 hover:underline">
            excluir
          </button>

        </div>

      </div>
    `;
  });
}

// ABRIR MODAL
function abrirModal() {
  document.getElementById("modal").classList.remove("hidden");
}

// FECHAR MODAL
function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
  document.getElementById("nomeCategoria").value = "";
  editandoId = null;
}

// SALVAR / EDITAR
async function salvarCategoria() {
  const nome = document.getElementById("nomeCategoria").value;

  if (!nome) return alert("Digite um nome");

  if (editandoId) {
    await fetch(`${API}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });
  }

  fecharModal();
  carregarCategorias();
}

// EDITAR
function editar(id, nome) {
  editandoId = id;
  document.getElementById("nomeCategoria").value = nome;
  abrirModal();
}

// EXCLUIR
async function excluir(id) {
  if (!confirm("Deseja excluir?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  carregarCategorias();
}

// INIT
carregarCategorias();