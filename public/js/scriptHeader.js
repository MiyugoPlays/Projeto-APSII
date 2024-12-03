document.addEventListener("DOMContentLoaded", () => {
    fetch('/verificar-autenticacao')
        .then(response => response.json())
        .then(data => {
            const loginLink = document.querySelector('a[href="/login"]');
            const loginTexto = loginLink.querySelector('.login-texto');
            const dropdown = document.getElementById('dropdown');

            if (data.autenticado) {
                // O usuário está autenticado
                // Remove o texto "Fazer Login"
                loginTexto.style.display = 'none'; // Esconde o texto

                // Adiciona um evento de clique para mostrar/ocultar o dropdown
                loginLink.addEventListener('click', (event) => {
                    event.preventDefault(); // Evita o comportamento padrão de redirecionamento
                    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; // Alterna a visibilidade
                });

                // Evento para fechar o dropdown ao clicar fora
                document.addEventListener('click', (event) => {
                    if (!loginLink.contains(event.target) && !dropdown.contains(event.target)) {
                        dropdown.style.display = 'none'; // Fecha o dropdown
                    }
                });

                // Lógica para o logout
                const sairLink = document.getElementById('sair');
                sairLink.addEventListener('click', (event) => {
                    event.preventDefault(); // Evita o comportamento padrão de redirecionamento
                    fetch('/logout', {
                        method: 'GET',
                        credentials: 'include' // Inclui cookies na requisição
                    })
                    .then(response => {
                        if (response.ok) {
                            // Opcional: redireciona ou atualiza a página após logout
                            window.location.href = '/'; // Redireciona para a página inicial
                        }
                    })
                    .catch(error => console.error('Erro ao deslogar:', error));
                });
            }
        })
        .catch(error => console.error('Erro ao verificar autenticação:', error));
});
