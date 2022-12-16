import prisma from '../../lib/prisma'
import { validateRoute } from '../../lib/auth'

const playlistHandler = async (req, res, user) => {
  const playlists = await prisma.playlist.findMany({
    where: { userId: user.id },
    orderBy: { name: 'asc' },
  })

  res.json(playlists)
}

export default validateRoute(playlistHandler)
