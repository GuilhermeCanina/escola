// Recupera as informações do professor logado
const professor = JSON.parse(localStorage.getItem('professor'));

if (!professor) {
    alert('Você precisa estar logado para acessar essa página.');
    window.location.href = 'login.html'; // Redireciona para a página de login
}

// Exibe o nome do professor autenticado
document.getElementById('professorName').textContent = professor.nome;

// Função de logout
function logout() {
    localStorage.removeItem('professor'); // Remove o professor da sessão
    alert('Sessão encerrada!');
    window.location.href = 'login.html'; // Redireciona para o login
}

// Busca as turmas do professor no backend
async function fetchTurmas() {
    try {
        const response = await fetch(`http://localhost:3000/turmas/${professor.id}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar as turmas.');
        }
        const turmas = await response.json();
        renderTurmas(turmas);
    } catch (error) {
        alert('Erro ao buscar turmas: ' + error.message);
    }
}

// Renderiza as turmas na página
function renderTurmas(turmas) {
    const turmaList = document.getElementById('turmaList');
    turmaList.innerHTML = '';

    turmas.forEach((turma) => {
        const li = document.createElement('li');
        li.textContent = turma.nome;

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.onclick = () => excluirTurma(turma.id);

        li.appendChild(excluirBtn);
        turmaList.appendChild(li);
    });
}

// Cadastra uma nova turma no backend
async function showCadastroTurma() {
    const nomeTurma = prompt('Digite o nome da turma:');
    if (nomeTurma) {
        try {
            const response = await fetch('http://localhost:3000/turmas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: nomeTurma, professor_id: professor.id }),
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar a turma.');
            }
            alert('Turma cadastrada com sucesso!');
            fetchTurmas(); // Atualiza a lista de turmas
        } catch (error) {
            alert('Erro ao cadastrar turma: ' + error.message);
        }
    }
}

// Exclui uma turma no backend
async function excluirTurma(id) {
    if (confirm('Tem certeza de que deseja excluir esta turma?')) {
        try {
            const response = await fetch(`http://localhost:3000/turmas/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Não foi possível excluir a turma.');
            }
            alert('Turma excluída com sucesso!');
            fetchTurmas(); // Atualiza a lista de turmas
        } catch (error) {
            alert('Erro ao excluir turma: ' + error.message);
        }
    }
}

// Inicializa a página carregando as turmas
fetchTurmas();
