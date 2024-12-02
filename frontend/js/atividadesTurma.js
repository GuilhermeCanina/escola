const API_URL = 'http://localhost:3000';
const turmaId = localStorage.getItem('turmaId');

async function carregarAtividades() {
    const response = await fetch(`${API_URL}/atividades/${turmaId}`);
    const atividades = await response.json();

    const container = document.getElementById('atividadesContainer');
    container.innerHTML = '';

    atividades.forEach((atividade) => {
        const div = document.createElement('div');
        div.textContent = `#${atividade.id} - ${atividade.descricao}`;
        container.appendChild(div);
    });
}

carregarAtividades();
