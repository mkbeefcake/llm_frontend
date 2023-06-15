import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { email, password } = await req.body;
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app" + '/users/token'
    
  var formBody = [];
  formBody.push('username' + '=' + email);
  formBody.push('password' + '=' + password);
  formBody = formBody.join('&');

  try {
    // we check that the user exists on GitHub and store some data in session
    console.log(`email:${email}, pass: ${password}`)
    const { token_type, access_token } = await fetchJson(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formBody
    });
    console.log(`token_type:${token_type}, access_token: ${access_token}`)

    const user = { isLoggedIn: true, access_token, token_type };
    req.session.set('user', user);    

    await req.session.save();
    res.json({'ok': 'Success', 'data': user});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
