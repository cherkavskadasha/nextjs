import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const article1 = await prisma.article.create({
    data: {
      title: 'Перша стаття з бази даних Neon',
      content: 'Це контент нашої першої статті, яка завантажена прямо з PostgreSQL за допомогою Prisma ORM.',
    },
  })

  const article2 = await prisma.article.create({
    data: {
      title: 'Основи Prisma ORM',
      content: 'Prisma робить роботу з базами даних у середовищі Node.js та Next.js надзвичайно зручною.',
    },
  })

  console.log('Database seeded successfully.')
  console.log({ article1, article2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })