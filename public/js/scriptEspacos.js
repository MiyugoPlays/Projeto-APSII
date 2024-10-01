async function carregarEspacos() {
    try {
        const response = await fetch('/espacos/lista');
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }
        const espacos = await response.json();
        console.log(espacos); // Adicione isso para verificar os dados  
        const lista = document.getElementById('lista-espacos');

        espacos.forEach(espaco => {
            const li = document.createElement('li');
            li.textContent = `${espaco.nome} - Preco: ${espaco.preco}`; // Ajuste conforme sua estrutura
            lista.appendChild(li);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Chama a função para carregar os espaços ao carregar a página
window.onload = carregarEspacos;