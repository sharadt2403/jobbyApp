import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import Login from './components/Login'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const testing = [1]

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/Jobs"
        component={Jobs}
        employmentList={employmentTypesList}
        salaryList={salaryRangesList}
        tes={testing}
      />
      <Route exact path="/Jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
