const API_URL = 'http://localhost:3000';
const professorId = localStorage.getItem('professorId');


async function carregarTurmas() {
    const response = await fetch(`${API_URL}/turmas/${professorId}`);
    const turmas = await response.json();

    const selectTurma = document.getElementById('nomeTurma');
    turmas.forEach((turma) => {
        const option = document.createElement('option');
        option.value = turma.id;
        option.textContent = turma.nome;
        selectTurma.appendChild(option);
    });
}

document.getElementById('formAtividade').addEventListener('submit', async (e) => {
    e.preventDefault();
    const turmaId = document.getElementById('nomeTurma').value;
    const descricao = document.getElementById('descricaoAtividade').value;

    const response = await fetch(`${API_URL}/atividades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turma_id: turmaId, descricao }),
    });

    if (response.ok) {
        alert('Atividade cadastrada com sucesso!');
        document.getElementById('formAtividade').reset();
    } else {
        alert('Erro ao cadastrar atividade.');
    }
});

carregarTurmas();
