const locationService = require('../services/locationService');

exports.getAllLocations = async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await locationService.getLocationById(id);
        if (!location) return res.status(404).json({ message: 'Local não encontrado' });
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
