const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/app');

describe('ONG', () => {
    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback({all: true});

        await connection.destroy();
    });

    it('should create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send(
                {
                    name: "BB ONG",
                    email: "ong2@ong.com",
                    whatsapp: "41999999999",
                    city: "Somewhere 2",
                    uf: "SC"
                }
            );

        expect(response.status).toBe(201);
    });
});