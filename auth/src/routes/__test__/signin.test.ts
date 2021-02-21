import {app} from "../../app";
import request from 'supertest';

it('responds with 400 when sending invalid credentials, (exp: sending a non existing email or an incorrect password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'rightpassword'
        });
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'wrong@email.com',
            password: 'rightpassword'
        })
        .expect(400);
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongpassword'
        })
        .expect(400);
});

it('responds with 20 when sending valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'rightpassword'
        });
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'rightpassword'
        })
        .expect(201);
})
