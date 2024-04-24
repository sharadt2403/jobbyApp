import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'
import './Home.css'

class Home extends Component {
  //   findJobs = () => {
  //     const {history} = this.props
  //     history.push('/jobs')
  //   }

  render() {
    return (
      <div>
        <Header />
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
        <div className="bg-home">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            {/* onClick={this.findJobs}  */}
            <button type="button">Find Jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
