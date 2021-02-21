import {app} from "../../app";
import request from 'supertest';

it('returns the current user when connected', async () => {
    const cookie = await global.signup();

    const currentuserResponse = await request(app)
        .get('/api/users/current-user')
        .set('Cookie', cookie);

    expect(currentuserResponse.body).not.toBeNull();
});

it('returns null when not connected', async () => {
   const response = await request(app)
       .get('/api/users/current-user');
   expect(response.body.currentUser).toBeNull();
});
