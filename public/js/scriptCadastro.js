async function validarCampos(){
    const email = document.getElementById('email').value 
    const senha = document.getElementById('senha').value 
    const confirmarSenha = document.getElementById('confirmarSenha').value

    const mensagem = document.getElementById('mensagem')

    // Limpar mensagem anterior
    mensagem.textContent = '';

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = 'red';
        return false
    }

    // Verifica se o email já está cadastrado
    const emailJaCadastrado = await verificarEmail(email);
    if (emailJaCadastrado) {
        mensagem.textContent = "Este email já está cadastrado.";
        mensagem.style.color = 'red';
        return false; // Retorna falso para impedir o envio
    }

    return true
   
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
    e.preventDefault();

    const camposValidos = await validarCampos();
    if (!camposValidos) return; // Se a validação falhar, não envia o formulário


    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert('Erro ao cadastrar: ' + error.message);
    }
});