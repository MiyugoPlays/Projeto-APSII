async function carregarEspaco() {
    const espacoId = window.location.pathname.split('/').pop(); // Pega o ID da URL

    try {
        const response = await fetch(`/api/espaco/${espacoId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar o espaço');
        }

        const espaco = await response.json();
        console.log(espaco)
        
        const preco = parseFloat(espaco.preco);
        if (isNaN(preco)) {
            console.error('Preço inválido para o espaço:', espaco);
            return; // Pula este espaço se o preço não for um número válido
        }

        document.getElementById('nome-espaco').textContent = espaco.nome;
        document.getElementById('descricao-espaco').textContent = espaco.descricao;
        document.getElementById('imagem-espaco').src = espaco.imagem;
        document.getElementById('bairro-espaco').textContent = espaco.bairro;
        document.getElementById('capacidade-espaco').textContent = espaco.capacidade;
        document.getElementById('cidade-espaco').textContent = espaco.cidade;
        document.getElementById('estado-espaco').textContent = espaco.estado_sigla;
        document.getElementById('rua-espaco').textContent = espaco.rua;
        document.getElementById('comple-espaco').textContent = espaco.complemento;
        document.getElementById('num-espaco').textContent = espaco.numero;
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