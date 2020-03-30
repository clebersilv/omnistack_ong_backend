const crypto = require('crypto');
const connection = require('../database/connection');

const table = 'ongs';

module.exports = {

    async list(req, res) {
        const ongs = await connection(table).select('*');
        return res.send(ongs).json();
    },

    async create(req, res) {
        const { id } = req.body;

        const ong = await connection(table)
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({error: 'No ONG found with this ID'});
        }

        return res.send(ong).json();
    },
}