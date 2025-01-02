const adminService = require('../services/adminService');

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await adminService.getUserById(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.suspendUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        await adminService.suspendUser(id, reason);
        res.status(200).json({ message: 'Usuário suspenso com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await adminService.deleteUser(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchUsersByName = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await adminService.searchUsersByName(username);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
