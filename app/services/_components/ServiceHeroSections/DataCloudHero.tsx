import FloatingLines from '../Floating';

interface Hero {
  bg_color: string
  title: string;
}

interface Props {
  data: Hero;
}


const DataCloudHero = ({ data }: Props) => {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center text-white text-center overflow-hidden relative'>

        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={5}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
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

export default DataCloudHero
