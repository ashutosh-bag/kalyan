import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Transparent Sticky Navbar with serialized links and social icons */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section with SVG KYN Letters & Multi-Directional Sliding Interior Photos */}
        <HeroSection />

        {/* About Section & Studio Ethos */}
        <AboutSection />

        {/* Projects Portfolio with Category Filtering & Interactive Modal */}
        <ProjectsSection />

        {/* Services & Capabilities */}
        <ServicesSection />

        {/* Blog & Architectural Monograph */}
        <BlogSection />

        {/* Contact & Consultation Form (API Connected) */}
        <ContactSection />
      </main>

      {/* Corporate Footer with Newsletter & Links */}
      <Footer />
    </>
  );
}
