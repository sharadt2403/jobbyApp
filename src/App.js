import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import Login from './components/Login'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Jobs" component={Jobs} />
      <Route exact path="/Jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
