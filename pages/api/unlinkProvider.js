import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';
const _url = require('url')

export default withSession(async (req, res) => {
  const user = req.session.get('user')    
  const { query } = _url.parse(req.url, true);
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/providers/unlink_provider?provider_name=${query.provider}`
  
  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': user.token_type + ' ' + user.access_token
      }
    });

    res.json(response);
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
