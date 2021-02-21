import {app} from "../../app";
import request from 'supertest';

it('returns 401 when not connected', async () => {
    return request(app)
        .post('/api/users/signout')
        .expect(401);
});

it('returns an empty response when signing out', async () => {
    const cookie = await global.signup();

    const signoutResponse = await request(app)
        .post('/api/users/signout')
        .set('Cookie', cookie);

    expect(signoutResponse.get('Set-Cookie')).toEqual(["express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"]);
})
