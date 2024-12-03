async function carregarReservas() {
    const espacoId = window.location.pathname.split('/')[2]; // Pega o ID do espaço da URL
    console.log("ID do espaço: ", espacoId);

    try {
        const response = await fetch(`/api/espaco/${espacoId}/reservas`);
        if (!response.ok) {
            throw new Error('Erro ao carregar as reservas');
        }
        
        const reservas = await response.json();
        
        const listaReservas = document.getElementById('reservas-lista');
        listaReservas.innerHTML = ''; // Limpa a lista antes de adicionar

        reservas.forEach(reserva => {
            // Criação de uma div para cada reserva
            const itemReserva = document.createElement('div');
            itemReserva.classList.add('reserva-item'); // Adiciona uma classe para estilo
        
            // Estrutura interna da div
            itemReserva.innerHTML = `
                <div class="reserva-info">
                    <p><strong>Data de Início:</strong> ${new Date(reserva.data_inicio).toLocaleString()}</p>
                    <p><strong>Data de Fim:</strong> ${new Date(reserva.data_fim).toLocaleString()}</p>
                    <p><strong>Status:</strong> ${reserva.status}</p>
                    <p><strong>Forma de Pagamento:</strong> ${reserva.forma_pagamento}</p>
                </div>
            `;
        
            // Torna o item clicável para abrir o modal
            itemReserva.addEventListener('click', () => toggleReservaForm());
        
            // Adiciona a div à lista de reservas
            listaReservas.appendChild(itemReserva);
        });
    } catch (error) {
        console.error('Erro ao carregar as reservas:', error);
        alert('Não foi possível carregar as reservas.');
    }
}

// Função para mostrar ou esconder o formulário de edição
function toggleReservaForm() {
    const overlay = document.getElementById('reservaOverlay');
    
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


window.onload = carregarReservas;