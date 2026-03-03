import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsProjectsSection from "@/components/SkillsProjectsSection";
import ContactSection from "@/components/ContactSection";
import ScrollTheme from "@/components/ScrollTheme";

export default function Home() {
  return (
    <>
      <ScrollTheme />
      <HeroSection />
      <AboutSection />
      <SkillsProjectsSection />
      <ContactSection />
    </>
  );
}

