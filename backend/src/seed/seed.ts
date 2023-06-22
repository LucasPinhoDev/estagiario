import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    const adminEmail = 'admin@admin.com';
    const userEmail = 'user@user.com';
    const password =
      '$2b$10$360gLSTpZuNBjWGWV2atR.B9nlbYJnAKa.ezLER5avGS4QDB/ZLrq';

    const user1 = await prisma.user.create({
      data: {
        email: adminEmail,
        fullName: 'Admin',
        type: 'company',
        password: password,
        linkedin: 'linkedin.com/user1',
        image: 'user1.jpg',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: userEmail,
        fullName: 'User',
        type: 'common',
        password: password,
        linkedin: 'linkedin.com/user',
        image: 'user.jpg',
      },
    });

    const company1 = await prisma.company.create({
      data: {
        name: 'Company 1',
        website: 'company1.com',
        logo: 'company1.jpg',
        location: 'Location 1',
        instagram: 'instagram.com/company1',
        desc: 'Description 1',
        linkedin: 'linkedin.com/company1',
        description: 'Description 1',
      },
    });

    const company2 = await prisma.company.create({
      data: {
        name: 'Company 2',
        website: 'company2.com',
        logo: 'company2.jpg',
        location: 'Location 2',
        instagram: 'instagram.com/company2',
        desc: 'Description 2',
        linkedin: 'linkedin.com/company2',
        description: 'Description 2',
      },
    });

    await prisma.job.create({
      data: {
        title: 'Job 1',
        jobLocationType: 'Location 1',
        desc: 'Description 1',
        desiredResponsibility: 'Responsibility 1',
        necessaryKnowledge: 'Knowledge 1',
        benefits: 'Benefits 1',
        value: 1000,
        companyId: company1.id,
        userId: user1.id,
      },
    });

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
