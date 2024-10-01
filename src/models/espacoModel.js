const db = require('../db.js');

const Espaco = {
    obterEspacos: () => {
        return new Promise((resolve, reject) =>{
            db.query('SELECT * FROM espacos', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
    }
}

module.exports = Espaco;