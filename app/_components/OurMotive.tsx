import ScrollReveal from "@components/ScrollReveal";

function OurMotive() {
    return (
        <section className=" flex h-full items-center justify-center py-8 sm:py-14 md:py-20  ">
            <div className="container max-w-6xl mx-auto w-full">
                <h2 className="heading text-white text-center">
                    What we do
                </h2>
                <ScrollReveal
                    containerClassName="subHeading  font-semibold text-white mt-6 sm:mt-8 md:mt-10 text-center  leading-relaxed"
                    textClassName="text-inherit font-normal leading-relaxed"
                    baseOpacity={0.3}
                    enableBlur={true}
                    baseRotation={0}
                    blurStrength={0}
                >
                    At ThirdVizion Labs, we design and build intelligent digital solutions that help businesses operate
                     smarter, scale faster, and stay future-ready.We specialize in custom ERP systems, business automation,
                      software development, cloud solutions, and immersive technologies tailored to unique business needs.
                       Our approach goes beyond technology to focus on solving real operational challenges. By streamlining workflows,
                        centralizing data, and enhancing efficiency, we simplify complex business processes.

                </ScrollReveal>
            </div>
        </section>
    );
}

export default OurMotive;