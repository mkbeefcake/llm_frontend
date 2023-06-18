import fetchJson from '../../lib/fetchJson';
import { getSession } from '../../lib/session';

export default async function updateProviderInfo(req, res) {
  const { provider, social_info, identifier } = await req.body;
  const user = getSession(req)

  const param = encodeURIComponent(JSON.stringify(social_info));

  const url = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app") + `/providers/update_provider_info?provider_name=${provider}&identifier_name=${identifier}&social_info=${param}`
  console.log(`[UpdateProviderInfo]: ${url}`)
  
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
}