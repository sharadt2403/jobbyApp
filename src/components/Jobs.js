import {Component} from 'react'
import Cookies from 'js-cookie'
import MainContainer from './JobsStyledComponent'

class Jobs extends Component {
  componentDidMount = async () => {
    const jobsURL = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsURL, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <MainContainer>
        <div className="left-container">
          <div>
            <img src="" alt="" />
            <h1>Rahul Attuluri</h1>
            <p>Lead Software Developer and AI</p>
          </div>
          <div>
            <h1>Type of Employment</h1>
            <input id="fullTime" type="checkbox" />
            <label htmlFor="fullTime">Full Time</label>
          </div>
          <div>
            <h1>Salary Range</h1>
          </div>
        </div>
        <div className="right-container">
          <input type="search" />
          <div className="job-card">
            <div>
              <img src="" alt="" />
              <div>
                <h1>Devops Engineer</h1>
                <p>Rating</p>
              </div>
            </div>
            <div>
              <p>Delhi</p>
              <p>Internship</p>
              <div>10 LPA</div>
            </div>
            <div>
              <p>Description</p>
              <p>
                We are looking for a DevOps Engineer with a minimum of 5 years
                of industry
              </p>
            </div>
          </div>
        </div>
      </MainContainer>
    )
  }
}

export default Jobs
