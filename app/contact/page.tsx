import type { Metadata } from "next";
import FAQ from "@/src/components/Faq";
import { homeFaq } from "../_components/data";
import ContactForm from "./_components/ContactForm";
import GradientWaves from "@/src/components/GradientWaves";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Third Vizion in Chennai: service request form, business@thirdvizion.com, and phone support. Ask questions and start your next VR, cloud, or software project with us.",
};

export default function Page() {
  return (
    <>
      <div className="relative w-full flex flex-col items-center overflow-hidden bg-black py-10 lg:py-16 min-h-screen">
        {/* Single Unified Full-Page GradientWaves WebGL Background */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-auto">
          <GradientWaves
            horizonColor="#0A0818"
            waveColor="#5227FF"
            crestColor="#C8A2FF"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.2}
            fogDepth={22}
            detail="medium"
            brightness={1.35}
            opacity={1.0}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          />
        </div>

        {/* Section 1: Connect With Us Form */}
        <div className="relative z-10 w-full flex flex-col items-center container mb-10 lg:mb-14 pointer-events-auto">
          <h1 className="text-white heading my-6 lg:my-8">Connect With Us</h1>
          <ContactForm />
        </div>

        {/* Section 2: Location Map */}
        <div className="relative z-10 w-full flex flex-col items-center container pointer-events-auto">
          {/* Map */}
          <div className="w-full">
            <h3 className="text-white bodyText mb-4 text-center">We are Located Here</h3>
            <div className="w-full rounded-[20px] overflow-hidden border-2 border-[#242424]" style={{ height: "350px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.302!2d80.2167!3d13.1282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f4b7d6ee9cb%3A0x4a78c154d8f1be5c!2sRamdass%20Nagar%2C%20Kolathur%2C%20Chennai%2C%20Tamil%20Nadu%20600099!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ThirdVizion Office Location"
              />
            </div>
          </div>
        </div>
      </div>

      <FAQ faqData={homeFaq} />
    </>
  );
}
