import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe('users', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it('should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User example'
        })

        expect(response.status).toBe(201)
    })

    it('shouldn\'t be able to create a user with exists email', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User example'
        })

        expect(response.status).toBe(400)
    })

})