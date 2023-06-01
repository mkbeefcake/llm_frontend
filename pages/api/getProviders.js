import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user')    
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/providers/get_providers'
    
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
