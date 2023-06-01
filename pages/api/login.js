import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { email, password } = await req.body;
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/users/token'
    
  var formBody = [];
  formBody.push('username' + '=' + email);
  formBody.push('password' + '=' + password);
  formBody = formBody.join('&');

  try {
    // we check that the user exists on GitHub and store some data in session
    const { token_type, access_token } = await fetchJson(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formBody
    });

    const user = { isLoggedIn: true, access_token, token_type };
    req.session.set('user', user);    

    await req.session.save();
    res.json(user);    
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
