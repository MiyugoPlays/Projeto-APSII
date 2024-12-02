
document.getElementById('formAddEspaco').addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita o envio padrão do formulário

    // Coleta os dados do formulário
    const form = document.getElementById('formAddEspaco');
    const formData = new FormData(form);

    try {
        // Envia a requisição POST para a rota 'api/adicionarEspaco'
        const response = await fetch('/api/adicionarEspaco', {
            method: 'POST',
            body: formData,  // Envia os dados como FormData
        });

        const data = await response.json();  // Recebe a resposta do servidor

        if (response.ok) {
            alert(data.message); // Mensagem de sucesso
            window.location.reload();  
        } else {
            alert('Erro: ' + data.message); // Mensagem de erro
        }
    } catch (error) {
        alert('Erro ao cadastrar o espaço: ' + error.message);
    }
});

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
                    <button class="btn-edit" onclick="openEditModal(${espaco.id}, '${espaco.nome.replace("'", "\\'")}', '${espaco.descricao.replace("'", "\\'")}', ${espaco.capacidade}, ${preco.toFixed(2)}, '${espaco.cep}', '${espaco.rua}', '${espaco.numero}', '${espaco.complemento}', '${espaco.bairro}', '${espaco.cidade}', '${espaco.estado_sigla}', '${espaco.imagem}', '${espaco.status}')">Editar</button>
                    <button class="btn-delete" onclick="openDeleteModal(${espaco.id})">Excluir</button>
                    <button class="btn-ver-reservas" onclick="()">Ver reservas</button>
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
function openEditModal(espacoId, nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estadoSigla, imagem, status) {
    console.log("Abrindo modal de edição para o espaço ID:", espacoId);
    console.log(nome, descricao, capacidade, preco, cep, rua, numero, complemento, bairro, cidade, estadoSigla, imagem, status);

    // Preencher os campos do modal com os dados do espaço diretamente
    document.getElementById('editid').value = espacoId;
    document.getElementById('editnome').value = nome;
    document.getElementById('editdescricao').value = descricao;
    document.getElementById('editcapacidade').value = capacidade;
    document.getElementById('editpreco').value = preco;
    document.getElementById('editcep').value = cep;
    document.getElementById('editrua').value = rua;
    document.getElementById('editnumero').value = numero;
    document.getElementById('editcomplemento').value = complemento;
    document.getElementById('editbairro').value = bairro;
    document.getElementById('editcidade').value = cidade;
    document.getElementById('editestado_sigla').value = estadoSigla;
    document.getElementById('editstatus').value = status;


    
    // Exibir o modal
    document.getElementById("editOverlay").classList.remove("hide");
    document.getElementById("editOverlay").classList.add("show");
   

}

// Função para fechar o modal de edição
function closeEditModal() {
    document.getElementById("editOverlay").classList.add("hide");
    document.getElementById("editOverlay").classList.remove("show");
}

function openDeleteModal(espacoId) {
    console.log("Abrindo modal de exclusão para o espaço ID:", espacoId);
    // Guardar o ID do espaço para exclusão
    document.getElementById("confirmDelete").onclick = () => confirmarExclusao(espacoId);
    document.getElementById("deleteOverlay").classList.remove("hide");
    document.getElementById("deleteOverlay").classList.add("show");
}

function closeDeleteModal() {
    document.getElementById("deleteOverlay").classList.add("hide");
    document.getElementById("deleteOverlay").classList.remove("show");
}

function openAddModal() {
    document.getElementById("addOverlay").classList.remove("hide");
    document.getElementById("addOverlay").classList.add("show");
}

function closeAddModal() {
    document.getElementById("addOverlay").classList.add("hide");
    document.getElementById("addOverlay").classList.remove("show");
}

// Função para excluir o espaço
function deleteEspaco(espacoId) {
    console.log("Deletando espaço ID:", espacoId);
     // Exibir o modal
}

// Função que será chamada ao clicar nos filtros de "Disponíveis" ou "Indisponíveis"
function mostrarEspacos(filtro) {
    console.log(`Função mostrarEspacos chamada com o filtro: ${filtro}`);
    carregarEspacos(filtro);
}

// Função para editar o espaço
async function editarEspaco() {
    // Coleta os dados do formulário de edição
    const form = document.getElementById('formEditEspaco');
    const formData = new FormData(form);

    const espacoId = document.getElementById('editid').value;

    try {
        const response = await fetch(`/api/editarEspaco/${espacoId}`, {
            method: 'PUT',
            body: formData,  // Envia os dados com FormData (incluindo arquivos)
        });

        // Apenas lê a resposta JSON uma vez
        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Mensagem de sucesso
        } else {
            // Caso haja erro, exibe a mensagem de erro retornada pela API
            alert('Erro: ' + data.message || 'Erro desconhecido');
        }

    } catch (error) {
        // Se houver erro na requisição (como rede ou servidor), exibe a mensagem de erro
        alert('Erro ao editar o espaço: ' + error);
    }
}

async function confirmarExclusao(espacoId) {
    try {
        const response = await fetch(`/api/excluirEspaco/${espacoId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.reload();  // Recarregar a página após a exclusão
        } else {
            alert('Erro: ' + data.message);
        }
    } catch (error) {
        alert('Erro ao excluir o espaço: ' + error.message);
    }
}

// Inicializa com o filtro de "Disponíveis"
window.onload = function() {
    mostrarEspacos('disponiveis');
};

