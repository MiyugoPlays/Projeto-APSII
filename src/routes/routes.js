const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer'); // Importando o multer para a rota
const fs = require('fs');
const espacoController = require('../controllers/espacoController.js');
const usuarioController = require('../controllers/usuarioController.js');
const reservasController = require('../controllers/reservasController.js');

// Middleware de verificação de autenticação
const verificarAutenticacao = (req, res, next) => {
    const { usuarioId } = req.cookies; // Lê o ID do usuário do cookie

    if (!usuarioId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Se necessário, você pode verificar o ID do usuário no banco de dados aqui

    next(); // Chama o próximo middleware ou rota
};


// Definindo onde as imagens serão salvas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Alterando o caminho para a pasta correta
        cb(null, path.join(__dirname, '../../public/assets/uploads/')); // Nova pasta
    },
    filename: (req, file, cb) => {
        // O nome do arquivo será o timestamp + a extensão
        cb(null, Date.now() + path.extname(file.originalname)); // Exemplo: 1733009520882.jpg
    }
});

// Criando a instância do multer com as opções de armazenamento
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        // Validando se o arquivo é uma imagem
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb('Erro: Apenas imagens JPEG, JPG, PNG ou GIF são permitidas!');
        }
    }
}).single('imagem'); // O campo 'imagem' será usado no formulário (form-data)

const uploadEdit = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        // Validando se o arquivo é uma imagem
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb('Erro: Apenas imagens JPEG, JPG, PNG ou GIF são permitidas!');
        }
    }
}).single('editimagem');



// --------- Rotas Públicas (sem necessidade de autenticação) ---------

// Rota para a página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'login.html'));
});

// Rota para a página de cadastro
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'cadastro.html'));
});

// Rota para a página de informações sobre o site
router.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'sobre.html'));
});

// Rota para a página de espaços cadastrados
router.get('/espacos', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'espacos.html'));
});

router.get('/espaco/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'sobre_espaco.html'));
});

router.get('/espaco/:id/reservar', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'reservar_espaco.html'));
});
// --------- Rotas de API ---------


router.get('/api/espaco/:id', espacoController.obterEspacoPorId);

// Rota de cadastro de usuário (POST)
router.post('/cadastro', usuarioController.cadastrar);

// Rota de login de usuário (POST)
router.post('/login', usuarioController.login);

// Rota para verificar se o email já está cadastrado (POST)
router.post('/verificar-email', usuarioController.verificarEmail);

// Rota para verificar autenticação do usuário
router.get('/verificar-autenticacao', verificarAutenticacao, (req, res) => {
    res.json({ autenticado: true }); // Responde que o usuário está autenticado
});

// Rota de API para listar todos os espaços
router.get('/api/listarEspacos', espacoController.listarEspacos);

// Rota de logout do usuário (GET)
router.get('/logout', (req, res) => {
    res.clearCookie('usuarioId'); // Remove o cookie
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
});

// --------- Rotas Privadas (que exigem autenticação) ---------

// Rota para acessar o perfil do usuário
router.get('/meu-perfil', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'perfil.html'));
});

// Rota privada para excluir um espaço (requere autenticação)
router.delete('/api/excluirEspaco/:id', verificarAutenticacao, espacoController.excluirEspaco);

router.post('/api/adicionarEspaco', verificarAutenticacao, (req, res, next) => {
    // Usar o middleware de upload de imagem
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        next(); // Se o upload for bem-sucedido, chama o próximo middleware
    });
}, espacoController.adicionarEspaco);

router.put('/api/editarEspaco/:id', verificarAutenticacao, (req, res, next) => {
    // Usar o middleware de upload de imagem
    uploadEdit(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        next(); // Se o upload for bem-sucedido, chama o próximo middleware
    });
}, espacoController.editarEspaco);

router.get('/minhas-reservas', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'minhas_reservas.html'));
});

router.get('/meus-espacos', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'meus_espacos.html'));
});

router.get('/meus-espacos/:id/reservas/', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'reservas_do_espaco.html'));
});

// Rota de API para mostrar o perfil do usuário (requere autenticação)
router.get('/api/mostrarPerfil', verificarAutenticacao, usuarioController.mostrarPerfil);

// Rota de api que faz atualizar o perfil
router.put('/api/atualizarPerfil',verificarAutenticacao, usuarioController.atualizarPerfil);

// Rota para listar os espaços de um usuário específico
router.get('/api/listarEspacosPorUsuario',verificarAutenticacao, espacoController.listarEspacosPorUsuario); // Nova rota

router.get('/api/espaco/:id/reservas', verificarAutenticacao, reservasController.listarReservasDoEspaco);

// --------- Página Inicial ---------

// Rota para a página inicial (requer autenticação)
router.get('/', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
});

module.exports = router;
