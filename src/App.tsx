import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

const Home = lazy(() => import('./pages/Home'))

const App = () => {
  return (
    <div className="min-h-screen">
      <Helmet
        titleTemplate="%s | HolyFans"
        defaultTitle="HolyFans | Design your best fortune"
      ></Helmet>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
