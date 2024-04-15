import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {IoIosContact} from 'react-icons/io'
import {MainContainer, ProfileBg} from './JobsStyledComponent'
import Headers from './Header'

const apiConstants = {
  profileInitial: 'PROFILE_INITIAL',
  profileLoading: 'PROFILE_LOADING',
  profileSuccess: 'PROFILE_SUCCESS',
  profileFailed: 'PROFILE_FAILED',
  jobsInitial: 'JOBS_INITIAL',
  jobsLoading: 'JOBS_LOADING',
  jobsSuccess: 'JOBS_SUCCESS',
  jobsFailed: 'JOBS_FAILED',
}

class Jobs extends Component {
  state = {
    apiConstantsStatus: apiConstants,
    isProfile: apiConstants.profileInitial,
    jobDetails: apiConstants.jobsInitial,
  }

  componentDidMount = async () => {
    this.setState({isProfile: apiConstants.profileLoading})
    const jobsURL = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsURL, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.setState({isProfile: apiConstants.profileSuccess})
    }
    if (response.status === 401) {
      this.setState({isProfile: apiConstants.profileFailed})
    }
  }

  renderProfileLoadingView = () => {
    const {isProfile} = this.state
    return (
      <div>
        <h1>Loading View</h1>
      </div>
    )
  }

  renderProfileSuccessView = () => {
    const {isProfile} = this.state
    return (
      <ProfileBg>
        <IoIosContact />
        <p>Rahul Attuluri</p>
        <p>Lead Software Developer and AI</p>
      </ProfileBg>
    )
  }

  renderProfileFailedView = () => {
    const {isProfile} = this.state
    return (
      <div>
        <h1>Failed View</h1>
      </div>
    )
  }

  renderProfile = () => {
    const {isProfile} = this.state
    switch (isProfile) {
      case apiConstants.profileLoading:
        return this.renderProfileLoadingView()
      case apiConstants.profileSuccess:
        return this.renderProfileSuccessView()
      case apiConstants.profileFailed:
        return this.renderProfileFailedView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Headers />
        <MainContainer>
          <div className="left-container">
            <div>{this.renderProfile()}</div>
            <hr />
            <div>
              <h1>Type of Employment</h1>
              <input id="fullTime" type="checkbox" />
              <label htmlFor="fullTime">Full Time</label>
              <input id="partTime" type="checkbox" />
              <label htmlFor="partTime">Part Time</label>
              <input id="freeLance" type="checkbox" />
              <label htmlFor="freeLance">Freelance</label>
              <input id="internship" type="checkbox" />
              <label htmlFor="internship">Internship</label>
            </div>
            <hr />
            <div>
              <h1>Salary Range</h1>
              <input id="fullTime" type="checkbox" />
              <label htmlFor="fullTime">Full Time</label>
              <input id="partTime" type="checkbox" />
              <label htmlFor="partTime">Part Time</label>
              <input id="freeLance" type="checkbox" />
              <label htmlFor="freeLance">Freelance</label>
              <input id="internship" type="checkbox" />
              <label htmlFor="internship">Internship</label>
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
      </>
    )
  }
}

export default Jobs
