import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {Loader} from 'react-loader-spinner'
import {MainContainer, ProfileBg, SearchBar} from './JobsStyledComp'
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
    isProfile: apiConstants.profileInitial,
    profileDetails: [],
    isJob: apiConstants.jobsInitial,
    jobDetails: [],
    employmentType: '',
    minimumPackage: '',
    search: '',
    inputValue: '',
  }

  componentDidMount = () => {
    this.profileDisplay()
    this.jobDisplay()
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="three-dots-loading"
        color="#ffffff"
        height="50"
        width="50"
      />
    </div>
  )

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

  renderProfileLoadingView = () => {
    this.loader()
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state

    return (
      <ProfileBg>
        <img src={profileDetails.profileImageUrl} alt="profileImage" />
        <p>{profileDetails.name}</p>
        <p>{profileDetails.shortBio}</p>
      </ProfileBg>
    )
  }

  clickedFailedView = () => {
    this.profileDisplay()
  }

  renderProfileFailedView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <button type="button" onClick={this.clickedFailedView}>
        Retry
      </button>
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
    const {employmentType, minimumPackage, search} = this.state
    this.setState({isJob: apiConstants.jobsLoading})
    const jobsURL = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    // const jobsURL = `https://apis.ccbp.in/jobs`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsURL, options)
    const data = await response.json()
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

  renderJobsLoadingView = () => {
    this.loader()
  }

  renderJobsSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <div>
        <ul>
          {jobDetails.map(item => (
            <JobDetailsList item={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  clickedJobFailedView = () => {
    this.jobDisplay()
  }

  renderJobsFailedView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <button type="button" onClick={this.clickedJobFailedView}>
        Retry
      </button>
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

  inputChange = e => {
    this.setState({inputValue: e.target.value})
  }

  searchClicked = () => {
    const {inputValue} = this.state
    this.setState({search: inputValue}, this.jobDisplay)
    console.log('searchhhh')
  }

  onKeyUpInput = () => {
    const {inputValue} = this.state
    this.setState({search: inputValue}, this.jobDisplay)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {search} = this.state
    console.log(search)
    const {employmentList, salaryList, tes} = this.props
    console.log('testing:  ', tes)

    return (
      <>
        <Headers />
        <MainContainer>
          <div className="left-container">
            <div>{this.renderProfile()}</div>
            <hr />
            <div>
              <h1>Type of Employment</h1>
              {}
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
            <SearchBar>
              <input
                type="search"
                onChange={this.inputChange}
                onKeyUp={this.onKeyUpInput}
              />
              <button
                type="button"
                onClick={this.searchClicked}
                data-testid="searchButton"
                style={{cursor: 'pointer'}}
              >
                .<BsSearch className="search-icon" />
              </button>
            </SearchBar>
            <div>{this.renderJobs()}</div>
          </div>
        </MainContainer>
      </>
    )
  }
}

export default Jobs
