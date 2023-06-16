import { destroySession } from '../../lib/session'

export default async function(req, res) {
  destroySession(res)
  res.json({ isLoggedIn: false })
}