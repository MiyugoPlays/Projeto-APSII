async function carregarReservasEConfigurarCalendario() {
    const espacoId = window.location.pathname.split('/')[2]; // ID do espaço


        // Configuração do Flatpickr
        flatpickr("#data_inicio", {
            minDate: "today", // Impede a seleção de datas anteriores
            enableTime: true, // Habilita a seleção de hora
            dateFormat: "Y-m-d H:i", // Formato de data e hora
            disable: [
                // Desabilitar datas que estão no intervalo de alguma reserva
                function(date) {
                    
                }
            ]
        });

        flatpickr("#data_fim", {
            minDate: "today", // Impede a seleção de datas anteriores
            enableTime: true, // Habilita a seleção de hora
            dateFormat: "Y-m-d H:i", // Formato de data e hora
            disable: [
                // Desabilitar datas que estão no intervalo de alguma reserva
                function(date) {
                   
                }
            ]
        });

   
}

document.getElementById("form-reserva").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    const dataInicio = document.getElementById("data_inicio").value;
    const dataFim = document.getElementById("data_fim").value;
    const formaPagamento = document.getElementById("forma_pagamento").value;
    const espacoId = window.location.pathname.split('/')[2]; // ID do espaço
    
    // Verificar se as datas são válidas
    if (!dataInicio || !dataFim) {
        alert("Por favor, selecione as datas de início e fim.");
        return;
    }

    // Verificar se a data de início é antes da data de fim
    if (new Date(dataInicio) >= new Date(dataFim)) {
        alert("A data de início deve ser anterior à data de fim.");
        return;
    }

    try {
        const response = await fetch(`/api/reservar-espaco/${espacoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data_inicio: dataInicio,
                data_fim: dataFim,
                forma_pagamento: formaPagamento,
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Reserva realizada com sucesso!");
            window.location.href = '/minhas-reservas'
        } else {
            
            console.error(data.message);
        }
    } catch (error) {
        console.error("Erro ao realizar a reserva:", error);
    }
});

window.onload = carregarReservasEConfigurarCalendario;