import withSession from '../../lib/session'
import fetchJson from '../../lib/fetchJson'

export default withSession(async (req, res) => {

  const user = req.session.get('user')

  if (user) {
    try {
      // we check that the user exists on GitHub and store some data in session
      const url = process.env.NEXT_PUBLIC_BASE_URL + '/users/me'
      const response = await fetchJson(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': user.token_type + ' ' + user.access_token
        }
      });
  
      if (response.detail && response.detail == 'User unauthorized') {
        req.session.destroy();
        res.json({'err': 'Failure', reason: '{"isLoggedIn": false}'})
        return;
      }

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
    res.json({'err': 'Failure', reason: '{"isLoggedIn": false}'})
  }
})
