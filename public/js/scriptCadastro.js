function validarCampos(){
    const email = document.getElementById('email').value 
    const senha = document.getElementById('senha').value 
    const confirmarSenha = document.getElementById('confirmarSenha').value

    const mensagem = document.getElementById('mensagem')

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = 'red';
    }

}
//PRECISA FAZER PRA VALIDAR O CAMPO EMAIL BASEADO NO DB