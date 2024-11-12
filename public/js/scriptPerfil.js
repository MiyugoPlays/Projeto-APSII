function carregarPerfil() {
    fetch('/api/mostrarPerfil', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Caso ocorra algum erro, por exemplo, usuário não encontrado
            alert(data.message);
            return;
        }

        // Preencher os campos com os dados do usuário
        document.getElementById('email').textContent = data.email;
        document.getElementById('senha').textContent = data.senha;
    })
    .catch(error => {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar perfil.');
    });
}

// Chama a função ao carregar a página
window.onload = carregarPerfil;