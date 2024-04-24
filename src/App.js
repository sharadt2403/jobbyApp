import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import JobItemDetails from './components/JobItemDetails/JobItemDetails'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/Jobs" component={Jobs} />
      <ProtectedRoute exact path="/Jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
