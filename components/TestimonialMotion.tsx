'use client';
import { TestimonialsColumnMotion } from '@/components/ui/testimonial-column-motion';
import { motion } from 'motion/react';

const testimonials = [
  {
    text: 'LaunchKit saved me 20+ hours of setup time. The tutorials are crystal clear and the tech stack is perfectly chosen for modern web apps.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Briana Patton',
    role: 'Full Stack Developer',
  },
  {
    text: 'Setting up authentication, payments, and deployment from scratch was always a nightmare. LaunchKit made it effortless.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Bilal Ahmed',
    role: 'Solo Founder',
  },
  {
    text: 'The documentation is exceptional. Every feature is explained with real examples, making implementation smooth and fast.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Saman Malik',
    role: 'Frontend Developer',
  },
  {
    text: "LaunchKit's pre-built components and integrations let me focus on building features instead of boilerplate code.",
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Omar Raza',
    role: 'Startup Founder',
  },
  {
    text: 'The Stripe integration and user management work out of the box. This is exactly what I needed to ship faster.',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Zainab Hussain',
    role: 'Product Manager',
  },
  {
    text: 'Clean, modern codebase with TypeScript and Tailwind. LaunchKit helped me build a professional app in record time.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Aliza Khan',
    role: 'UI/UX Designer',
  },
  {
    text: 'The deployment setup with Vercel is seamless. From local development to production in minutes, not hours.',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Farhan Siddiqui',
    role: 'DevOps Engineer',
  },
  {
    text: 'LaunchKit understands what developers actually need. The authentication flow and database setup are production-ready.',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Sana Sheikh',
    role: 'Backend Developer',
  },
  {
    text: 'Worth every penny. The time saved on setup allowed me to focus on my core product and launch ahead of schedule.',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Hassan Ali',
    role: 'Indie Hacker',
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsMotion = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumnMotion testimonials={firstColumn} duration={20} />
          <TestimonialsColumnMotion
            testimonials={secondColumn}
            className="hidden md:block"
            duration={29}
          />
          <TestimonialsColumnMotion
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={27}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMotion;
// This code defines a motion-enabled testimonials section for a web application.
