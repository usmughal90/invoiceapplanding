import Blog from "./Blog";
import DownloadSection from "./DownloadSection";
import FeaturesSection from "./FeaturesSection";
import FaqSection from "./FaqSection";
import Header from "../shared/Header";
import HeroSection from "./HeroSection";
import Reviews from "./Reviews";
import ScreenshotsSlider from "./ScreenshotsSlider";
 
import Footer from "../shared/Footer";
import HowItWorksSection from "./HowItWorksSection";
import { navItems } from "@/_data/home";
 

export default function LandingPage() {
  return (
    <div className="min-h-100 relative">
      <div className="">
        <Header navItems={navItems} />
        <HeroSection />
      </div>
      <FeaturesSection />
       <HowItWorksSection/>
     
      <ScreenshotsSlider />
      
       
      <Reviews />
      <Blog />
      <FaqSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}
