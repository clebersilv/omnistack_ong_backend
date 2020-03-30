const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

const table = 'ongs';

module.exports = {

    async list(req, res) {
        const ongs = await connection(table).select('*');
        return res.send(ongs).json();
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = generateUniqueId();

        await connection(table).insert({ id, name, email, whatsapp, city, uf });

        return res.send({ id }).json();
    },
}