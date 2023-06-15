import fetchJson from '../../lib/fetchJson';
import { setSession } from '../../lib/session';

export default async function(req, res) {
  const { email, password } = await req.body;
  const url = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app") + '/users/token'
    
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
    setSession(res, user);
    res.json({'ok': 'Success', 'data': user});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json({'err': JSON.stringify(error) });
  }
}
