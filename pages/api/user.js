import { getSession } from '../../lib/session';
import fetchJson from '../../lib/fetchJson'

export default async function user(req, res) {

  const user = getSession(req)

  if (user) {
    try {
      // we check that the user exists on backend and store some data in session
      // const url = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://chat-automation-387710-yix5m2x4pq-uc.a.run.app") + '/users/me'
      // const response = await fetchJson(url, {
      //   method: 'GET',
      //   headers: {
      //     'accept': 'application/json',
      //     'Authorization': user.token_type + ' ' + user.access_token
      //   }
      // });
  
      // if (response.detail && response.detail == 'User unauthorized') {
      //   req.session.destroy();
      //   res.json({"isLoggedIn": false})
      //   return;
      // }

      res.json({'ok': 'Success', 'data': {
        isLoggedIn: true,
        ...user,
      }})
    } 
    catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json(error.data);
    }
  } 
  else {
    res.json({"isLoggedIn": false})
  }
}