import type { Metadata } from "next";
import { GridScan } from "@/src/components/GridScan";
import { Industries } from "./_components/Industries";
import Motive from "./_components/Motive";
import ImagesFlow from "@/src/components/ImagesFlow";
import { teamImages } from "@/src/data/TeamImg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Delivering smart solutions for business growth and innovation. Learn Third Vizion’s motive, the industries we serve, and meet the team behind immersive tech, cloud, and software projects.",
};

function page() {


    return (
        <>
            <div className="relative  h-screen overflow-hidden bg-primary">
                <h1 className="text-white z-10 heading text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Delivering Smart Solutions for Your Business Growth and Innovation
                </h1>
                <div className="w-full h-full absolute top-0 left-0">
                    <GridScan
                        sensitivity={0.55}
                        lineThickness={1}
                        linesColor="#392e4e"
                        gridScale={0.1}
                        scanColor="#2200ff"
                        scanOpacity={0.4}
                        enablePost
                        bloomIntensity={0.6}
                        chromaticAberration={0.002}
                        noiseIntensity={0.01}
                    />
                </div>
            </div>
            <Motive />
            <Industries />


            <div>
                <ImagesFlow
                    introTitle="Begin"
                    introSubtitle="Scroll to explore the journey"
                    flowText={'Meet the Minds Behind Third Vizion'}
                    outroTitle="BYE!"
                    outroSubtitle="The end is just another beginning"
                    images={teamImages}
                />
            </div>
        </>
    )
}

export default page