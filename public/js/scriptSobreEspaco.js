async function carregarEspaco() {
    const espacoId = window.location.pathname.split('/').pop(); // Pega o ID da URL

    try {
        const response = await fetch(`/api/espaco/${espacoId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar o espaço');
        }

        const espaco = await response.json();
        
        const preco = parseFloat(espaco.preco);
        if (isNaN(preco)) {
            console.error('Preço inválido para o espaço:', espaco);
            return; // Pula este espaço se o preço não for um número válido
        }

        document.getElementById('nome-espaco').textContent = espaco.nome;
        document.getElementById('descricao-espaco').textContent = espaco.descricao;
        document.getElementById('imagem-espaco').src = espaco.imagem;
        document.getElementById('preco-espaco').textContent = `Preço: R$ ${preco.toFixed(2)}`;
        
        // Atualizando o link do botão "Reservar"
        const reservarLink = document.getElementById('reservar-link');
        reservarLink.href = `/espaco/${espaco.id}/reservar`;  // Atualiza o href com o id do espaço

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar os detalhes do espaço');
    }
}

window.onload = carregarEspaco;