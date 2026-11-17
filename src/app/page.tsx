import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PackagesSection from '@/components/PackagesSection';
import SpatialShowcase from '@/components/SpatialShowcase';
import ProjectsSection from '@/components/ProjectsSection';
import ApartmentTestimonials360 from '@/components/ApartmentTestimonials360';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Transparent Sticky Navbar with brand logo and quick links */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {/* Hero Section with Responsive SVG KALYAN Letters & Multi-Directional Sliding Interior Photos */}
        <HeroSection />

        {/* About Section & Studio Ethos of Kalyan Design Studio */}
        <AboutSection />

        {/* Services & Capabilities */}
        <ServicesSection />

        {/* Client's Signature Full Interior Packages Section (1 BHK, 2 BHK, 3 BHK) */}
        <PackagesSection />

        {/* Our Projects Section */}
        <ProjectsSection />

        {/* Spatial Architecture & Dynamic Interior Visual Showcase */}
        <SpatialShowcase />

        {/* 360° Virtual Apartment Tours & Real Homeowner Testimonials */}
        <ApartmentTestimonials360 />

        {/* Real Verified Google Reviews of Kalyan Design Studio */}
        <GoogleReviewsSection />
      </main>

      {/* Corporate Footer with Newsletter & Links */}
      <Footer />
    </>
  );
}
