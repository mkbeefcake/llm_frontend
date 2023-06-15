import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { provider, identifierName } = await req.body;
  const user = req.session.get('user')

  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app" + `/bots/stop_auto_bot?provider_name=${provider}&identifier_name=${identifierName}`
  console.log(`[StopAutoBot]: ${url}`)

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

    res.json({'ok': 'Success', 'data': response});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
