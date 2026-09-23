import Hero from "./_components/landing/Hero";
import HowItWorks from "./_components/landing/HowItWorks";
import TemplatesShowcase from "./_components/landing/TemplatesShowcase";
import Benefits from "./_components/landing/Benefits";
import FAQSection from "./_components/landing/FAQSection";
import FinalCTA from "./_components/landing/FinalCTA";
import Footer from "./_components/footer/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero />
      <HowItWorks />
      <TemplatesShowcase />
      <Benefits />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
