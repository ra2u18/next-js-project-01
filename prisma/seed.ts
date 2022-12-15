import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { artistsData } from './songsData'

const prisma = new PrismaClient()

const run = async () => {
  const promises = artistsData.map(async ({ name: artistName, songs }) =>
    prisma.artist.upsert({
      where: { name: artistName },
      update: {},
      create: {
        name: artistName,
        songs: {
          create: songs.map(({ name: songName, duration, url }) => ({
            name: songName,
            duration,
            url,
          })),
        },
      },
    })
  )

  await Promise.all(promises)

  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  })

  const songs = await prisma.song.findMany({})

  await Promise.all(
    new Array(10).fill(1).map(async (_, index) =>
      prisma.playlist.create({
        data: {
          name: `Playlist #${index + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      })
    )
  )
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
