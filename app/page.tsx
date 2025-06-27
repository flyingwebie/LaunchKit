import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import FeaturesAccordion from '@/components/FeaturesAccordion';
import Pricing from '@/components/Pricing';
import FaqSection from '@/components/FaqSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import Testimonials3 from '@/components/Testimonials3';
import TestimonialsMotion from '@/components/TestimonialMotion';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
        <Testimonials3 className="bg-gray-400/10" />
        <Pricing />
        <TestimonialsMotion />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
