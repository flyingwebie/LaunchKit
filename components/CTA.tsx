import Image from 'next/image';
import { Button } from '@/components/ui/button';
import config from '@/config';

const Cta = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[250px] py-14">
      <Image
        src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative text-center text-white p-8">
        <div className="flex flex-col items-center max-w-xl p-4 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight md:mb-12">
            Boost your app, launch, earn
          </h2>
          <p className="text-lg opacity-80 md:mb-16">
            Don&apos;t waste time integrating APIs or designing a pricing
            section...
          </p>

          <Button
            className="bg-green-700 hover:bg-green-800 animate-opacity"
            size="wide"
          >
            Get {config.appName}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
