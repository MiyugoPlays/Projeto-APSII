// Função principal que carrega os espaços de acordo com o filtro
async function carregarEspacos(filtro) {
    try {
        // Chama a API para listar os espaços do usuário logado
        const response = await fetch('/api/listarEspacosPorUsuario');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        const espacos = await response.json();

        // Verifica se a resposta contém a mensagem indicando que o usuário não tem espaços
        if (espacos.message) {
            alert(espacos.message); // Exibe a mensagem que foi retornada pela API
            return; // Se o usuário não tiver espaços, não faz mais nada
        }

        console.log("Espaços recebidos da API:", espacos); // Verifique se os espaços estão corretos

        if (!Array.isArray(espacos)) {
            throw new Error('Dados de espaços inválidos');
        }

        const lista = document.getElementById('espacos-lista');
        if (!lista) {
            throw new Error('Elemento com id "espacos-lista" não encontrado');
        }

        lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        // Loop pelos espaços e cria a estrutura HTML para cada um
        espacos.forEach(espaco => {
            // Verifica se o espaço corresponde ao filtro selecionado
            if (filtro === 'disponiveis' && espaco.status !== 'disponivel') {
                console.log(`Espaço ${espaco.id} não está disponível, filtrando.`);
                return; // Pula o espaço se o status não for o filtro
            }

            if (filtro === 'indisponiveis' && espaco.status !== 'indisponivel') {
                console.log(`Espaço ${espaco.id} não está indisponível, filtrando.`);
                return; // Pula o espaço se o status não for o filtro
            }

            // Certifique-se de que o preço é um número válido
            const preco = parseFloat(espaco.preco);
            if (isNaN(preco)) {
                console.error('Preço inválido para o espaço:', espaco);
                return; // Pula este espaço se o preço não for válido
            }

            // Criando o HTML para cada espaço
            const divEspaco = document.createElement('div');
            divEspaco.classList.add('espaco'); // Classe para estilizar

            divEspaco.innerHTML = `
                <div class="espaco-info">
                    <h3>${espaco.nome}</h3>
                    <p>${espaco.descricao}</p>
                    <p>Capacidade: ${espaco.capacidade}</p>
                    <p>Preço: R$ ${preco.toFixed(2)}</p>
                </div>
                <div class="espaco-actions">
                    <button class="btn-edit" onclick="openEditModal(${espaco.id}, '${espaco.nome}', '${espaco.descricao}', ${espaco.capacidade}, ${preco.toFixed(2)})">Editar</button>
                    <button class="btn-delete" onclick="deleteEspaco(${espaco.id})">Excluir</button>
                </div>
            `;

            // Adiciona a divEspaco dentro da lista
            lista.appendChild(divEspaco);
        });
    } catch (error) {
        console.error('Erro ao carregar espaços:', error);
        alert('Ocorreu um erro ao carregar os espaços. Tente novamente mais tarde.');
    }
}



// Função para abrir o modal de edição do espaço
function openEditModal(espacoId, nome, descricao, capacidade, preco) {
        console.log("Abrindo modal de edição para o espaço ID:", espacoId);
        console.log(nome, descricao, capacidade, preco);

        // Preencher os campos do modal com os dados do espaço diretamente
        document.getElementById('nome').value = nome;
        document.getElementById('descricao').value = descricao;
        document.getElementById('capacidade').value = capacidade;
        document.getElementById('preco').value = preco;

        // Exibir o modal
        document.getElementById("editOverlay").classList.remove("hide");
        document.getElementById("editOverlay").classList.add("show");
  
}



// Função para fechar o modal de edição
function closeEditModal() {
    document.getElementById("editOverlay").classList.add("hide");
    document.getElementById("editOverlay").classList.remove("show");
}

// Função para excluir o espaço
function deleteEspaco(espacoId) {
    console.log("Deletando espaço ID:", espacoId);
    // Lógica para excluir o espaço
    alert(`Espaço com ID ${espacoId} seria excluído.`);
}

// Função que será chamada ao clicar nos filtros de "Disponíveis" ou "Indisponíveis"
function mostrarEspacos(filtro) {
    console.log(`Função mostrarEspacos chamada com o filtro: ${filtro}`);
    carregarEspacos(filtro);
}

// Inicializa com o filtro de "Disponíveis"
window.onload = function() {
    mostrarEspacos('disponiveis');
};
