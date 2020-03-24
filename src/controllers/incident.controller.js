const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.status(201).json({ id });
    },
    async list(request, response) {
        const ong_id = request.headers.authorization;
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .innerJoin('ongs', 'incidents.ong_id', 'ongs.id')
            .where({ ong_id })
            .limit(5)
            .offset(5 * (page - 1))
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', Object.values(count).pop());

        return response.json(incidents);
    },
    async delete(request, response) {
        const ong_id = request.headers.authorization;
        const { id } = request.params;

        const r = await connection('incidents')
            .where({ id, ong_id })
            .delete();

        if (r > 0) {
            return response.status(200).json({ msg: 'Incident deleted' });
        } else {
            return response.status(404).json({ msg: 'Incident not found' });
        }
    }
};