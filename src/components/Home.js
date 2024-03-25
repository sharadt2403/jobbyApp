import {Component} from 'react'

class Home extends Component {
  findJobs = () => {
    const {history} = this.props
    console.log('clicked')
    history.push('/jobs')
  }

  render() {
    return (
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button onClick={this.findJobs} type="button">
          Find Jobs
        </button>
      </div>
    )
  }
}
export default Home
