// Evento ao submeter o formulário de login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Requisição para a API para validar o login
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        if (response.ok) {
            const data = await response.json();
            // Salva os dados do professor no localStorage para uso posterior
            localStorage.setItem('professor', JSON.stringify(data));
            alert('Login realizado com sucesso!');
            window.location.href = 'principal.html'; // Redireciona para a página principal
        } else if (response.status === 401) {
            alert('Credenciais inválidas. Tente novamente.');
        } else {
            throw new Error('Erro ao realizar o login.');
        }
    } catch (error) {
        alert('Erro ao realizar o login: ' + error.message);
    }
});
