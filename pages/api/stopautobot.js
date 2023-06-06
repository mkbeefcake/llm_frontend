import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { provider } = await req.body;
  const user = req.session.get('user')

  const url = process.env.NEXT_PUBLIC_BASE_URL + `/users/stop_auto_bot?provider_name=${provider}`
  console.log(`[StopAutoBot]: ${JSON.stringify({
    'provider_name': provider, 
  })}`)

  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': user.token_type + ' ' + user.access_token
      },
      body: JSON.stringify({})
    });

    res.json(response);
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
