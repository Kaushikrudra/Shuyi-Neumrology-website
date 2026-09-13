import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const emailArg = process.argv[2] || 'kaushikrudra610@gmail.com';
  const roleArg = process.argv[3] || 'admin';
  const targetEmail = emailArg.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: targetEmail },
  });

  if (!user) {
    console.error(`❌ User with email "${targetEmail}" was not found in the database.`);
    const allUsers = await prisma.user.findMany({ select: { email: true, name: true, role: true } });
    console.log('Available registered users:', allUsers);
    process.exit(1);
  }

  const updated = await prisma.user.update({
    where: { email: targetEmail },
    data: { role: roleArg },
  });

  console.log(`✅ Success! Updated user "${updated.email}" (${updated.name || 'User'}) to role "${updated.role}".`);
}

main()
  .catch((err) => {
    console.error('Error updating role:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
