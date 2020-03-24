const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const [ ong ] = await connection('ongs')
            .where({ id })
            .limit(1)
            .select('name')
            ;

        if (!ong) {
            return response.status(404).json({ msg: 'ONG not found' });
        }

        return response.json(ong);
    }
}