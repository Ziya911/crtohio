import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL!
  const adminPassword = process.env.ADMIN_PASSWORD!

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
  }

  // Remove old admin if it exists
  const oldAdmin = await prisma.user.findUnique({ where: { email: 'admin@crtohio.com' } })
  if (oldAdmin) {
    await prisma.session.deleteMany({ where: { userId: oldAdmin.id } })
    await prisma.account.deleteMany({ where: { userId: oldAdmin.id } })
    await prisma.user.delete({ where: { id: oldAdmin.id } })
    console.log('Old admin removed: admin@crtohio.com')
  }

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 12),
        name: 'MedStats Admin',
        role: Role.ADMIN,
        emailVerified: new Date(),
      },
    })
    console.log('Admin user created:', adminEmail)
  } else {
    console.log('Admin user already exists:', adminEmail)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
