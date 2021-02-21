import request from "supertest";
import {app} from "../../app";

it('returns a 201 when sending a valid email and password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'nour@test.com',
            password: 'strongpassword'
        })
        .expect(201);
});

it('returns a 401 when sending an invalid email or an invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalidemail',
            password: 'goodpassword'
        })
        .expect(400);

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'bad'
        })
        .expect(400);
});

it('returns a 401 when sending an existing email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'nour@test.com',
            password: 'strongpassword'
        });
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'nour@test.com',
            password: 'strongpassword'
        })
        .expect(400);
});

it('sets a cookie after a successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'nour@test.com',
            password: 'strongpassword'
        });

    expect(response.get('Set-Cookie')).toBeDefined();
})
