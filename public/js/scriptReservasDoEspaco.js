async function carregarReservas() {
    const espacoId = window.location.pathname.split('/')[2]; // Pega o ID do espaço da URL
    console.log("ID do espaço: ", espacoId);

    try {
        const response = await fetch(`/api/espaco/${espacoId}/reservas`);
        if (!response.ok) {
            throw new Error('Erro ao carregar as reservas');
        }
        
        const reservas = await response.json();
        
        const divReserva = document.getElementById('reserva-info')
        const listaReservas = document.getElementById('reservas-lista');
        listaReservas.innerHTML = ''; // Limpa a lista antes de adicionar

        if(reservas.length === 0){
            divReserva.innerHTML = "Este espaço não possui reservas";
        }else{
            reservas.forEach(reserva => {
                // Criação de uma div para cada reserva
                const itemReserva = document.createElement('div');
                itemReserva.classList.add('reserva-item'); // Adiciona uma classe para estilo
            
                // Estrutura interna da div
                itemReserva.innerHTML = `
                    <div class="reserva-info">
                        <p><strong>Nome do Usuário:</strong> ${reserva.nome_usuario}</p>
                        <p><strong>Data de Início:</strong> ${new Date(reserva.data_inicio).toLocaleString()}</p>
                        <p><strong>Data de Fim:</strong> ${new Date(reserva.data_fim).toLocaleString()}</p>
                        <p><strong>Status:</strong> ${reserva.status}</p>
                        <p><strong>Forma de Pagamento:</strong> ${reserva.forma_pagamento}</p>
                    </div>
                `;
            
                // Torna o item clicável para abrir o modal
                itemReserva.addEventListener('click', () => toggleReservaForm(reserva.id, reserva.status));
            
                // Adiciona a div à lista de reservas
                listaReservas.appendChild(itemReserva);
            });
        }

        
    } catch (error) {
        console.error('Erro ao carregar as reservas:', error);
        alert('Não foi possível carregar as reservas.');
    }
}

let reservaIdAtual = null
// Função para mostrar ou esconder o formulário de edição
function toggleReservaForm(reservaId, reservaStatus) {
    const overlay = document.getElementById('reservaOverlay');

    reservaIdAtual = reservaId; // Armazena o ID da reserva que foi clicada
    document.getElementById('status').value = reservaStatus;
    
    if (overlay.classList.contains('hide')) {
        overlay.classList.remove('hide');
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
        overlay.classList.add('hide');
    }
}

// Função para fechar o modal quando clicar fora dele
document.getElementById('reservaOverlay').addEventListener('click', function(event) {

    // Verifica se o clique foi fora do modal (no overlay)
    if (event.target === this) { // `this` refere-se ao #editOverlay
        toggleReservaForm(); // Fecha o modal
    }
});

document.getElementById('form-editar-status').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const status = document.getElementById('status').value; // Pega o valor do status
    const reservaId = reservaIdAtual; // Pega o ID da reserva da variável global

    try {
        // Envia uma solicitação PUT para alterar o status da reserva
        const response = await fetch(`/api/reservas/${reservaId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }), // Envia o status alterado
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Mensagem de sucesso
            toggleReservaForm(); // Fecha o modal após sucesso
            carregarReservas();
            // Você pode recarregar as reservas ou atualizar a lista de reservas após a mudança
        } else {
            alert('Erro: ' + data.message || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Erro ao alterar status:', error);
        alert('Erro ao alterar o status da reserva');
    }
});

window.onload = carregarReservas;