const crypto = require('crypto');
const connection = require('../database/connection');

const table = 'incidents';

module.exports = {

    async list(req, res) {
        const {page = 1} = req.query;

        const [count] = await connection(table).count();
        res.header('X-Total-Count', count['count(*)'])
    
        const incidents = await connection(table)
            .join('ongs', 'ongs.id', '=', `${table}.ong_id`)
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        return res.send(incidents).json();
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection(table).insert({ title, description, value, ong_id });

        return res.send({ id }).json();
    },


    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incidents = await connection(table)
            .where('id', id)
            .select('ong_id')
            .first();

        if (incidents.ong_id !== ong_id) {
            return res.status(401).send({error: 'Operation not permitted'});
        }

        await connection(table)
            .where('id', id)
            .delete();

        return res.status(204).send();
    },
}