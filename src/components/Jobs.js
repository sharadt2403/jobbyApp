import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {MainContainer, ProfileBg} from './JobsStyledComp'
import Headers from './Header'
import JobDetailsList from './JobDetailsList'

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
    profileDetails: [],
    isJob: apiConstants.jobsInitial,
    jobDetails: [],
  }

  componentDidMount = () => {
    this.profileDisplay()
    this.jobDisplay()
  }

  profileDisplay = async () => {
    this.setState({isProfile: apiConstants.profileLoading})
    const profileURL = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileURL, options)
    const data = await response.json()
    const profileData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    if (response.ok === true) {
      this.setState({
        isProfile: apiConstants.profileSuccess,
        profileDetails: profileData,
      })
    }
    if (response.status === 401) {
      this.setState({isProfile: apiConstants.profileFailed})
    }
  }

  renderProfileLoadingView = () => (
    <div>
      <h1>Profile Loading View</h1>
    </div>
  )

  renderProfileSuccessView = () => {
    const {isProfile, profileDetails} = this.state

    return (
      <ProfileBg>
        <img src={profileDetails.profileImageUrl} alt="profileImage" />
        <p>{profileDetails.name}</p>
        <p>{profileDetails.shortBio}</p>
      </ProfileBg>
    )
  }

  renderProfileFailedView = () => (
    <div>
      <h1>Profile Failed View</h1>
    </div>
  )

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

  jobDisplay = async () => {
    this.setState({isJob: apiConstants.jobsLoading})
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
    // console.log(response)
    // console.log(data.jobs[0])
    const jobData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    if (response.ok === true) {
      this.setState({isJobs: apiConstants.jobsSuccess, jobDetails: jobData})
    }
    if (response.status === 401) {
      this.setState({isJobs: apiConstants.jobsFailed})
    }
  }

  renderJobsLoadingView = () => (
    <div>
      <h1>Jobs Loading View</h1>
    </div>
  )

  clickedJobId = id => {
    // const {history} = props
    console.log(id)
    // const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    // if (jwtToken !== undefined) {
    //   history.push(`/Jobs/${id}`)
    // }
  }

  renderJobsSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <div>
        <ul>
          {jobDetails.map(item => (
            <JobDetailsList
              item={item}
              key={item.id}
              clickedJobId={this.clickedJobId}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsFailedView = () => (
    <div>
      <h1>Jobs Failed View</h1>
    </div>
  )

  renderJobs = () => {
    const {isJobs} = this.state
    switch (isJobs) {
      case apiConstants.jobsLoading:
        return this.renderJobsLoadingView()
      case apiConstants.jobsSuccess:
        return this.renderJobsSuccessView()
      case apiConstants.jobsFailed:
        return this.renderJobsFailedView()
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
            <div>{this.renderJobs()}</div>
          </div>
        </MainContainer>
      </>
    )
  }
}

export default Jobs
