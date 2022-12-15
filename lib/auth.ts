import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies

    if (!token) {
      res.status(401)
      res.json({ error: 'Not Authorized' })
      return
    }

    let user

    try {
      const { id } = jwt.verify(token, 'secret')
      user = await prisma.user.findUnique({ where: { id } })

      if (!user) throw new Error()
    } catch (e) {
      res.status(401)
      res.json({ error: 'Not Authorized' })
      return
    }

    return handler(req, res, user)
  }
}
