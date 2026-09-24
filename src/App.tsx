import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <FAQ />
        <EnquiryForm />
      </main>

      <Footer />
      <FloatingContact />
    </div>
  );
}
