import axios from 'axios';

describe('UserService', () => {
  it('should return a map from signIn', async () => {
    const response = await axios.post('http://localhost:8080/user/sign-in', {
      username: 'test',
      password: 'test'
    });

    expect(response.status).toEqual(200);
    expect(response.data).toHaveProperty('token');
  });
});