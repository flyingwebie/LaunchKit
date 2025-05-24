import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ButtonSignin from "@/components/ButtonSignin";

export default function Page() {
  return (
    <>
      <header className="p-4 flex justify-end max-w-7xl mx-auto">
        <ButtonSignin text="Login" />
      </header>

      <main>
        <section className="flex flex-col items-center justify-center text-center gap-12 px-8 py-24">
          <h1 className="text-3xl font-extrabold">Ship Fast ⚡️</h1>

          <p className="text-lg opacity-80">
            The start of your new startup... What are you gonna build?
          </p>

          <Button asChild>
            <a
              href="https://www.flyingweb.design/docs"
              target="_blank"
            >
              Documentation & tutorials
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>

          <Link href="/blog" className="text-sm text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
            Fancy a blog?
          </Link>
        </section>
      </main>
    </>
  );
}
