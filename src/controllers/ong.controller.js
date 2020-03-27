const hexId = require('../helpers/uniqueid.helper');
const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = hexId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.status(201).json({ id });
    }
}