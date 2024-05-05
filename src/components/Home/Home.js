import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="bg-home">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button">Find Jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
