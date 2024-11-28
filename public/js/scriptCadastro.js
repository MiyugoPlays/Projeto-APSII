async function validarCampos() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const dataNascimento = document.getElementById('data_nascimento').value;  // Verificação de data
    const mensagem = document.getElementById('mensagem');

    // Limpar mensagem anterior
    mensagem.textContent = '';

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = 'red';
        return false;
    }

    // Verifica se o email já está cadastrado
    const emailJaCadastrado = await verificarEmail(email);
    if (emailJaCadastrado) {
        mensagem.textContent = "Este email já está cadastrado.";
        mensagem.style.color = 'red';
        return false; // Retorna falso para impedir o envio
    }

    // Verifica se a data de nascimento está preenchida
    if (!dataNascimento) {
        mensagem.textContent = "Data de nascimento é obrigatória.";
        mensagem.style.color = 'red';
        return false;
    }

    return true; // Campos válidos
}

async function verificarEmail(email) {
    const response = await fetch('/verificar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data.existe; // Supondo que a resposta tenha um campo 'existe'
}

document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const camposValidos = await validarCampos();
    if (!camposValidos) return; // Se a validação falhar, não envia o formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('data_nascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log('Dados a enviar:', { nome, email, senha, telefone, dataNascimento });

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha, telefone, dataNascimento }),
        });

        // Verifique se a resposta foi bem-sucedida (status 201)
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            window.location.href = '/'; // Redireciona após o cadastro
        } else {
            // Se não for sucesso, exiba a mensagem de erro e mantenha o usuário na página
            const data = await response.json();
            alert(data.message || 'Erro ao cadastrar. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar requisição:', error); // Log detalhado do erro
        alert('Erro ao cadastrar: ' + error.message);
    }
});
