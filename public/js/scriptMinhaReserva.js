document.addEventListener('DOMContentLoaded', () => {
    const espacoNome = document.querySelector('.nome-espaco');
    const dropdown = document.querySelector('.dropdown');
    const modalCancelar = document.getElementById('modal-cancelar');
    
    // Ao clicar no nome do espaço, exibe o dropdown
    espacoNome.addEventListener('click', () => {
        // Alterna a visibilidade do dropdown
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Função para abrir o modal de cancelamento
    window.openModalCancelar = function() {
        modalCancelar.style.display = 'block';
    };

    // Função para fechar o modal de cancelamento
    window.closeModalCancelar = function() {
        modalCancelar.style.display = 'none';
    };

    // Função para confirmar o cancelamento da reserva
    window.confirmarCancelamento = function() {
        // Aqui você pode adicionar a lógica para realmente cancelar a reserva
        alert("Reserva cancelada com sucesso!");
        closeModalCancelar();
    };
});