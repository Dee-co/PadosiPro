import 'dotenv/config';
import prisma from '../src/utils/prisma.js';

const tasks = [
  {
    name: 'Home Cleaning',
    category: 'Home Services',
    description: 'Professional cleaning service for homes and apartments',
  },
  {
    name: 'Plumbing',
    category: 'Home Services',
    description: 'Plumbing installation, repair and maintenance',
  },
  {
    name: 'Electrical Repair',
    category: 'Home Services',
    description: 'Electrical installation and repair services',
  },
  {
    name: 'Painting',
    category: 'Home Services',
    description: 'Interior and exterior home painting services',
  },
  {
    name: 'AC Repair',
    category: 'Home Services',
    description: 'Air conditioner repair and maintenance',
  },
  {
    name: 'Appliance Repair',
    category: 'Home Services',
    description: 'Repair services for common household appliances',
  },

  // Personal Services
  {
    name: 'Salon at Home',
    category: 'Personal Services',
    description: 'Beauty and grooming services at your doorstep',
  },
  {
    name: 'Fitness Trainer',
    category: 'Personal Services',
    description: 'Personal fitness and workout training',
  },
  {
    name: 'Yoga Classes',
    category: 'Personal Services',
    description: 'Personal and group yoga sessions',
  },
  {
    name: 'Home Tutor',
    category: 'Personal Services',
    description: 'Private tutoring for school and college students',
  },
  {
    name: 'Photography',
    category: 'Personal Services',
    description: 'Photography services for personal events',
  },
  {
    name: 'Event Support',
    category: 'Personal Services',
    description: 'Support services for small events and functions',
  },

  // Business Services
  {
    name: 'Digital Marketing',
    category: 'Business Services',
    description: 'Digital marketing and online promotion services',
  },
  {
    name: 'Accounting',
    category: 'Business Services',
    description: 'Bookkeeping and basic accounting services',
  },
  {
    name: 'Graphic Design',
    category: 'Business Services',
    description: 'Logo, branding and marketing design services',
  },
  {
    name: 'Web Development',
    category: 'Business Services',
    description: 'Website development and maintenance services',
  },
  {
    name: 'Business Consulting',
    category: 'Business Services',
    description: 'Business planning and consulting services',
  },
  {
    name: 'Social Media Management',
    category: 'Business Services',
    description: 'Social media content and account management',
  },

  // Local Services
  {
    name: 'Local Delivery',
    category: 'Local Services',
    description: 'Local package and document delivery services',
  },
  {
    name: 'Car Wash',
    category: 'Local Services',
    description: 'Car cleaning and washing services',
  },
  {
    name: 'Pest Control',
    category: 'Local Services',
    description: 'Pest inspection and treatment services',
  },
  {
    name: 'Gardening',
    category: 'Local Services',
    description: 'Garden maintenance and plant care services',
  },
  {
    name: 'Moving Assistance',
    category: 'Local Services',
    description: 'Local moving and shifting assistance',
  },
  {
    name: 'Laundry Service',
    category: 'Local Services',
    description: 'Laundry pickup, washing and delivery services',
  },
];

const seed = async () => {
  try {
    console.log('Seeding tasks...');

    await prisma.task.deleteMany();

    await prisma.task.createMany({
      data: tasks,
    });

    console.log(`Created ${tasks.length} tasks`);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();