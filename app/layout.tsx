import type { Metadata } from "next";
import { Anta, Outfit, Inter_Tight, Poppins } from "next/font/google";
import "@assets/styles/globals.css";
import MainLayout from "@/src/layout";

const anta = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Third Vizion",
    template: "%s | Third Vizion",
  },
  description:
    "Third Vizion delivers immersive technology (VR, AR, 3D), data and cloud solutions (CRM, ERP, IAM, servers), and custom software—web, mobile, games, and digital marketing—from Chennai, India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >

      <body
        className={`${anta.variable} ${outfit.variable} ${interTight.variable} ${poppins.variable} bg-primary antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
