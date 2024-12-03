// Função para carregar o perfil do usuário
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

        // Preencher os campos com os dados do usuário no perfil
        document.getElementById('email').textContent = data.email;
        document.getElementById('senha').textContent = data.senha;

        // Preencher os campos do formulário de edição (modal)
        document.getElementById('editEmail').value = data.email;
        document.getElementById('editSenha').value = data.senha;
    })
    .catch(error => {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar perfil.');
    });
}

// Chama a função ao carregar a página
window.onload = carregarPerfil;

// Função para mostrar ou esconder o formulário de edição
function toggleEditForm() {
    const overlay = document.getElementById('editOverlay');
    
    if (overlay.classList.contains('hide')) {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
        overlay.classList.add('hide');
    }
}

// Função para fechar o modal quando clicar fora dele
document.getElementById('editOverlay').addEventListener('click', function(event) {

    // Verifica se o clique foi fora do modal (no overlay)
    if (event.target === this) { // `this` refere-se ao #editOverlay
        toggleEditForm(); // Fecha o modal
    }
});

// Lógica para submeter o formulário de edição
document.getElementById('formEditPerfil').addEventListener('submit', async function(e) {
    e.preventDefault();

    const novoEmail = document.getElementById('editEmail').value;
    const novoSenha = document.getElementById('editSenha').value;

    try {
        const response = await fetch('/api/atualizarPerfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: novoEmail,
                senha: novoSenha
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert('Perfil atualizado com sucesso!');
            toggleEditForm();  // Fecha o modal
            location.reload(); //atualiza a pag
        } else {
            alert('Erro ao atualizar o perfil: ' + data.message);
        }
    } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        alert('Ocorreu um erro, tente novamente.');
    }
});
