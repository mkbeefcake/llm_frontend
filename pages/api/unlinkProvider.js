import fetchJson from '../../lib/fetchJson';
import { getSession } from '../../lib/session';
const _url = require('url')

export default async function unlinkProvider(req, res) {
  const user = getSession(req)    
  const { query } = _url.parse(req.url, true);
  const url = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app") + `/providers/unlink_provider?provider_name=${query.provider}&identifier_name=${query.identifier}`
  
  try {
    // we check that the user exists on GitHub and store some data in session
    const response = await fetchJson(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': user.token_type + ' ' + user.access_token
      }
    });

    res.json({'ok': 'Success', 'data': response});
  } 
  catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}