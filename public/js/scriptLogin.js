document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Mensagem de sucesso
            window.location.href = '/';
            // Redirecionar ou fazer algo após o login
        } else {
            alert('Erro: ' + data.message); // Mensagem de erro
        }
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});