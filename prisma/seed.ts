import { Prisma, PrismaClient } from '@prisma/client'
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
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
