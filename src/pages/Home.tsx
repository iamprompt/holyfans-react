import Layout from '@/layouts'
import { HolyfansStorage } from '@/utils/firebase'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Layout className="flex flex-col items-center md:grid md:grid-cols-2 max-w-screen-md w-screen h-full min-h-screen mx-auto">
      <div className="flex justify-center items-center h-full md:col-span-1 p-10 md:p-0">
        <picture>
          <source
            srcSet={HolyfansStorage.getUrl(`hero/landing-hero.avif`)}
            type="image/avif"
          />
          <source
            srcSet={HolyfansStorage.getUrl(`hero/landing-hero.webp`)}
            type="image/webp"
          />
          <source
            srcSet={HolyfansStorage.getUrl(`hero/landing-hero.png`)}
            type="image/png"
          />
          <img
            src={HolyfansStorage.getUrl(`hero/landing-hero.svg`)}
            className="max-h-96"
            alt="HolyFans Hero"
          />
        </picture>
      </div>
      <div className="flex flex-col justify-center items-center h-full md:col-span-1 p-10 mb-10 md:m-0 md:p-0">
        <picture>
          <source
            srcSet={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.avif`)}
            type="image/avif"
          />
          <source
            srcSet={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.webp`)}
            type="image/webp"
          />
          <source
            srcSet={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.svg`)}
            type="image/svg+xml"
          />
          <source
            srcSet={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.png`)}
            type="image/png"
          />
          <img
            src={HolyfansStorage.getUrl(`logo/lockup_color_horizontal.png`)}
            className="h-16"
            alt="HolyFans Logo"
          />
        </picture>
        <div className="my-6 text-xl md:text-2xl md:max-w-md font-netflix font-thin text-center">
          Design your best fortune
          <br />
          with the best fortune tellers
        </div>
        <Link
          id="explore-btn"
          to="/explore"
          className="w-auto px-5 py-3 text-lg text-white shadow-md bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl"
        >
          Explore
        </Link>
      </div>
    </Layout>
  )
}

export default HomePage
