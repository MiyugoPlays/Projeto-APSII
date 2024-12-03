// Função para abrir o modal de cancelamento
window.openModalCancelar = function(reservaId) {
    // Aqui você pode armazenar o ID da reserva para usar no cancelamento
    window.reservaIdCancelar = reservaId; // Salva o ID da reserva a ser cancelada
    const modalCancelar = document.getElementById('modal-cancelar');
    modalCancelar.style.display = 'block';
};

// Função para fechar o modal de cancelamento
window.closeModalCancelar = function() {
    const modalCancelar = document.getElementById('modal-cancelar');
    modalCancelar.style.display = 'none';
};

// Função para confirmar o cancelamento da reserva
window.confirmarCancelamento = async function() {
    const reservaId = window.reservaIdCancelar; // Obtém o ID da reserva para cancelar

    try {
        // Faz a requisição PUT para atualizar o status da reserva
        const response = await fetch(`/api/reservas/${reservaId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'cancelada' }) // Envia o status "cancelada"
        });

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            const data = await response.json();
            alert(data.message || "Erro ao cancelar reserva.");
            return;
        }

        // Sucesso: Mostra a mensagem de sucesso
        alert("Reserva cancelada com sucesso!");

        // Fechar o modal
        closeModalCancelar();

        // Atualiza a interface: Podemos, por exemplo, esconder a reserva ou marcar como cancelada
        carregarReservas(); // Recarrega as reservas (ou você pode atualizar diretamente o status na página)

    } catch (error) {
        console.error('Erro ao cancelar a reserva:', error);
        alert("Erro ao tentar cancelar a reserva.");
    }
};

async function carregarReservas() {
    try {
        const response = await fetch(`/api/minhas-reservas/`);
        if (!response.ok) {
            const data = await response.json();
            // Se não houver reservas, exibe a mensagem personalizada
            if (data.message) {
                console.log(data.message); // Exibe a mensagem retornada pelo servidor
                return;
            }
            throw new Error('Erro ao carregar as reservas');
        }
        
        const reservas = await response.json(); // Aqui você obtém as reservas com o nome do espaço
        
        console.log(reservas);

        const listaReservas = document.getElementById('espaco-reserva');
        listaReservas.innerHTML = ''; // Limpa a lista antes de adicionar novas reservas
        
        if (reservas.length === 0) {
            listaReservas.innerHTML = "<p>Você não possui nenhuma reserva.</p>";
        } else {
            reservas.forEach(reserva => {
                // Cria um novo elemento div para a reserva
                const divEspacoReserva = document.createElement('div');
                divEspacoReserva.classList.add('espaco-reserva');

                // Preenche o conteúdo HTML da reserva
                divEspacoReserva.innerHTML = `
                    <h3 class="nome-espaco">${reserva.nome_espaco}</h3>
                    <div class="dropdown" style="display: none;">
                        <p><strong>Data Início:</strong> ${new Date(reserva.data_inicio).toLocaleString()}</p>
                        <p><strong>Data Fim:</strong> ${new Date(reserva.data_fim).toLocaleString()}</p>
                        <p><strong>Status:</strong> ${reserva.status}</p>
                        <p><strong>Forma de Pagamento:</strong> ${reserva.forma_pagamento}</p>
                        <button class="btn-cancelar" onclick="openModalCancelar(${reserva.id})" ${reserva.status === 'cancelada' ? 'style="display:none;"' : ''}>Cancelar Reserva</button>
                    </div>
                `;

                // Adiciona a div da reserva na lista
                listaReservas.appendChild(divEspacoReserva);

                // Adiciona o evento de clique para mostrar/ocultar o dropdown
                divEspacoReserva.querySelector('.nome-espaco').addEventListener('click', () => {
                    const dropdown = divEspacoReserva.querySelector('.dropdown');
                    // Alterna a visibilidade do dropdown
                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
                });
            });
        }
    } catch (error) {
        console.error('Erro ao carregar as reservas:', error);
        alert('Não foi possível carregar as reservas.');
    }
}

window.onload = carregarReservas()