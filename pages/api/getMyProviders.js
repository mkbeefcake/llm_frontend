import fetchJson from '../../lib/fetchJson';
import withSession from '../../lib/session';


export default withSession(async (req, res) => {
  const user = req.session.get('user')    
  const url = process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app" + '/providers/get_my_providers'
    
  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': user.token_type + ' ' + user.access_token
      }
    });
    
    console.log(`[GetMyProviders] ${JSON.stringify(response)}`)
    res.json({'ok': 'Success', 'data': response});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
