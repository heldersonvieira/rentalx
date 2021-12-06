import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import request from 'supertest';
import { Connection } from 'typeorm';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm_database/index';

let connection: Connection;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash('admin', 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
             values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentalx.com.br',
            password: 'admin',
        });
        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Test category',
                description: 'Testing create category',
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(201);
    });

    it('should not be able a new category with name exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentalx.com.br',
            password: 'admin',
        });
        const { token } = responseToken.body;

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Test category',
                description: 'Testing create category',
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(400);
    });    
});
