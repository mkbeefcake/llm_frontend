import { destroySession } from '../../lib/session'

export default async function logout(req, res) {
  destroySession(res)
  res.json({ isLoggedIn: false })
}