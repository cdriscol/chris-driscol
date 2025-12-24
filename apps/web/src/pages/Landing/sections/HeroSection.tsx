import { SiteContainer } from "@/layout";
import { Button, useNavClick } from "@/ui";

type HeroSectionProps = {
  error?: string | null;
};

export const HeroSection = ({ error }: HeroSectionProps) => {
  const onNavClick = useNavClick();

  return (
    <header
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[url('/images/header-bg.jpg')] bg-cover bg-center bg-no-repeat bg-scroll text-center text-white max-[767px]:min-h-0"
    >
      <SiteContainer>
        <div className="pb-[160px] pt-[180px] max-[767px]:pb-[50px] max-[767px]:pt-[100px]">
          <div className="mb-[25px] font-serif text-[40px] italic leading-[40px] max-[767px]:text-[22px] max-[767px]:leading-[22px]">
            Welcome To My Website!
          </div>
          <div className="mb-[50px] font-heading text-[76px] font-bold uppercase leading-[76px] max-[767px]:text-[50px] max-[767px]:leading-[50px]">
            It&apos;s Nice To Meet You
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Button as="a" href="#aboutme" onClick={onNavClick("aboutme")}>
              Learn about me
            </Button>
          </div>
          {error ? (
            <p className="mx-auto mb-10 mt-0 max-w-[640px] text-base leading-[1.75] text-white/90">
              Error: {error}
            </p>
          ) : null}
        </div>
      </SiteContainer>
    </header>
  );
};
