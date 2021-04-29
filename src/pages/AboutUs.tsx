import Layout from '@/layouts'
import { HolyfansStorage } from '@/utils/firebase'
import { Helmet } from 'react-helmet'

type IDevProfile = {
  _stuid: string
  firstName: string
  lastName: string
  nickName: string
  summary: string
  imgUrl: {
    jpg?: string
    webp?: string
    avif?: string
  }
}

const AboutUsPage = () => {
  const developerProfiles: IDevProfile[] = [
    {
      _stuid: '6288018',
      firstName: 'Thanapat',
      lastName: 'Jumnongrat',
      nickName: 'Palm',
      summary: 'An earth creature who glorifies multidisciplinary approaches',
      imgUrl: {
        jpg: 'contributors/palm.jpg',
        webp: 'contributors/palm.webp',
        avif: 'contributors/palm.avif',
      },
    },
    {
      _stuid: '6288035',
      firstName: 'Veerakit',
      lastName: 'Prasertpol',
      nickName: 'Pete',
      summary:
        'An individualistic person who eager to learn what interest, but is super lazy and horribly at managing myself.',
      imgUrl: {
        jpg: 'contributors/pete.jpg',
        webp: 'contributors/pete.webp',
        avif: 'contributors/pete.avif',
      },
    },
    {
      _stuid: '6288087',
      firstName: 'Supakarn',
      lastName: 'Laorattanakul',
      nickName: 'Prompt',
      summary: 'A tech guy and a early adoptor of new technology',
      imgUrl: {
        jpg: `contributors/prompt.jpg`,
        webp: `contributors/prompt.webp`,
        avif: `contributors/prompt.avif`,
      },
    },
    {
      _stuid: '6288123',
      firstName: 'Thanaboon',
      lastName: 'Sapmontree',
      nickName: 'Time',
      summary:
        'A man who is finding the mystery of Life, the Universe, and Equality.',
      imgUrl: {
        jpg: 'contributors/time.jpg',
        webp: 'contributors/time.webp',
        avif: 'contributors/time.avif',
      },
    },
  ]

  return (
    <Layout className="grid grid-cols-2 gap-0 md:grid-cols-4 h-screen w-screen mx-auto text-black">
      <Helmet>
        <title>About us</title>
      </Helmet>
      {developerProfiles.map((d) => {
        return (
          <section key={d._stuid} className="relative h-full overflow-hidden">
            <div className="flex opacity-0 transition-all hover:opacity-100 flex-col absolute justify-center w-full h-full bg-pink-500 bg-opacity-70 text-white text-center px-5">
              <div>
                <h1 className="text-2xl lg:text-4xl font-bold">
                  {d.firstName}
                </h1>
                <h2 className="text-xl lg:text-2xl">{d.lastName}</h2>
              </div>
              <div className="mt-10 text-base lg:text-lg">{d.summary}</div>
            </div>
            <picture>
              {d.imgUrl.avif && (
                <source
                  srcSet={HolyfansStorage.getUrl(d.imgUrl.avif)}
                  type="image/avif"
                />
              )}
              {d.imgUrl.webp && (
                <source
                  srcSet={HolyfansStorage.getUrl(d.imgUrl.webp)}
                  type="image/webp"
                />
              )}
              <img
                src={d.imgUrl.jpg}
                alt={`${d.firstName} ${d.lastName}`}
                className="object-cover h-full w-full"
              />
            </picture>
          </section>
        )
      })}
    </Layout>
  )
}

export default AboutUsPage
