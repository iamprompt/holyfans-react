import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

const Home = lazy(() => import('@/pages/Home'))
const AboutUs = lazy(() => import('@/pages/AboutUs'))
const Explore = lazy(() => import('@/pages/Explore'))

const App = () => {
  return (
    <>
      <Helmet
        titleTemplate="%s | HolyFans"
        defaultTitle="HolyFans | Design your best fortune"
      ></Helmet>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/explore" component={Explore} />
        </Switch>
      </Suspense>
    </>
  )
}

export default App
