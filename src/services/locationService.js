const locationModel = require('../models/locationModel');

async function getAllLocations() {
    return await locationModel.obterLocais();
}

async function getLocationById(idLocal) {
    return await locationModel.buscarLocalPorId(idLocal);
}

module.exports = {
    getAllLocations,
    getLocationById
};
