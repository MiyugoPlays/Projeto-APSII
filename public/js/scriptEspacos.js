async function carregarEspacos() {
    try {
        const response = await fetch('/api/listarEspacos'); // URL da API para buscar os espaços
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        
        const espacos = await response.json();
        
        // Verifica se os dados de espaços são válidos
        if (!Array.isArray(espacos)) {
            throw new Error('Dados de espaços inválidos');
        }

        console.log(espacos); // Verifique os dados no console

        // Pegando o elemento da lista onde os espaços serão adicionados
        const lista = document.getElementById('lista-espacos');
        
        if (!lista) {
            throw new Error('Elemento com id "lista-espacos" não encontrado');
        }

        lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        // Loop pelos espaços e cria a estrutura HTML para cada um
        espacos.forEach(espaco => {

            if (espaco.status !== 'disponivel') {
                return; // Pula este espaço se não estiver disponível
            }


            // Verificar se o espaço possui as propriedades necessárias
            if (!espaco.id || !espaco.nome || !espaco.imagem || !espaco.descricao || espaco.preco === undefined || espaco.preco === null) {
                console.error('Espaço incompleto:', espaco);
                return; // Pula para o próximo espaço se o atual estiver incompleto
            }

            // Garantir que o preço seja um número
            const preco = parseFloat(espaco.preco);
            if (isNaN(preco)) {
                console.error('Preço inválido para o espaço:', espaco);
                return; // Pula este espaço se o preço não for um número válido
            }

            const divEspaco = document.createElement('div');
            divEspaco.classList.add('espaco'); // Classe para estilizar a div do espaço

            // Preenchendo a div com informações do espaço
            divEspaco.innerHTML = `
                <a href="/espaco/${espaco.id}" class="espaco-link">
                    <img src="${espaco.imagem}" alt="${espaco.nome}" class="espaco-img">
                    <h3>${espaco.nome}</h3>
                    <p>${espaco.descricao}</p>
                    <p>Preço: R$ ${preco.toFixed(2)}</p>
                </a>
            `;

            // Adiciona o espaço à lista
            lista.appendChild(divEspaco);
        });
    } catch (error) {
        // Mostra o erro no console
        console.error('Erro ao carregar espaços:', error);
        alert('Ocorreu um erro ao carregar os espaços. Tente novamente mais tarde.');
    }
}

// Chama a função para carregar os espaços quando a página carregar
window.onload = carregarEspacos;
