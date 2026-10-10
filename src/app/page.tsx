import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PackagesSection from '@/components/PackagesSection';
import SpatialShowcase from '@/components/SpatialShowcase';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Transparent Sticky Navbar with brand logo and quick links */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section with SVG KYN Letters & Multi-Directional Sliding Interior Photos */}
        <HeroSection />

        {/* Client's Signature Full Interior Packages Section (1 BHK, 2 BHK, 3 BHK) */}
        <PackagesSection />

        {/* Spatial Architecture & Dynamic Interior Visual Showcase */}
        <SpatialShowcase />

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
