import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const { provider, social_info } = await req.body;
  const user = req.session.get('user')

  const param = encodeURIComponent(JSON.stringify(social_info));

  const url = process.env.NEXT_PUBLIC_BASE_URL + `/providers/update_provider_info?provider_name=${provider}&social_info=${param}`

  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': user.token_type + ' ' + user.access_token
      },
      body: JSON.stringify({ 
        'provider_name': provider, 
        'social_info': social_info
      })
    });

    res.json({'ok': 'Success', 'data': response});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
