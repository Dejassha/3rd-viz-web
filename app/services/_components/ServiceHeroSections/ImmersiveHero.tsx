import Silk from "../Silk";

interface Hero {
    bg_color: string
    title: string;
}

interface Props {
    data: Hero;
}

const ImmersiveHero = ({ data }: Props) => {
    return (
        <>
            <div className='min-h-screen flex items-center justify-center text-white text-center overflow-hidden relative'>

                <div className="absolute inset-0 z-0">
                    <Silk
                        speed={5}
                        scale={1}
                        color="#7B7481"
                        noiseIntensity={1.5}
                        rotation={0}
                    />
                </div>

                <div className="container flex flex-col justify-center items-center gap-14 z-20">

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

export default ImmersiveHero

