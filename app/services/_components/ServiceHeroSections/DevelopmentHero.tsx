import Particles from "@/app/services/_components/Particles";

interface Hero {
    bg_color: string
    title: string;
}

interface Props {
    data: Hero;
}

const DevelopmentHero = ({ data }: Props) => {
    return (
        <>
            <div className='min-h-screen flex items-center justify-center text-white text-center overflow-hidden relative'>

                <Particles
                    particleColors={[data.bg_color]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />

                <div className="container flex flex-col justify-center items-center gap-14">

                    <h1 className='heading max-w-4xl'> {/* text-[clamp(1.4rem,3vw,3.5rem)] */}
                        {data.title}
                    </h1>

                    <button className='bg-transparent px-6 py-2.5 border border-icon-violet rounded-full text-white text-[clamp(1rem,2vw,1.5rem)]'>
                        Request a demo
                    </button>

                </div>
            </div>

        </>

    )
}

export default DevelopmentHero



