import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Loader} from 'react-loader-spinner'
import Header from '../Header/Header'
import JobDetailsList from '../JobDetailsList/JobDetailsList'
import EmploymentId from '../JobEmploymentFilter/JobsEmploymentId'
import Salary from '../JobSalaryFilter/JobsSalary'
import './Jobs.css'

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
    employmentTypeArr: [],
    minimumPackage: '',
    search: '',
    inputValue: '',
  }

  componentDidMount = () => {
    this.profileDisplay()
    this.jobDisplay()
  }

  loader = () => (
    <>
      <div className="profile-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
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
      <div className="profileDetails">
        <img
          className="profileImage"
          src={profileDetails.profileImageUrl}
          alt="profile"
        />
        <p className="profileHeading">{profileDetails.name}</p>
        <p className="profileParagraph">{profileDetails.shortBio}</p>
      </div>
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
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsURL, options)

    if (response.ok) {
      const data = await response.json()
      console.log(response)
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
      this.setState({isJobs: apiConstants.jobsSuccess, jobDetails: jobData})
      console.log(jobData)
    }
    if (response.status === 401) {
      this.setState({isJobs: apiConstants.jobsFailed})
    }
  }

  renderJobsLoadingView = () => {
    this.loader()
  }

  renderNoJobsView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs View</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <>
        {jobDetails.length > 0 ? (
          <ul className="ul-container">
            {jobDetails.map(item => (
              <JobDetailsList item={item} key={item.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
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
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
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
  }

  onKeyUpInput = () => {
    const {inputValue} = this.state
    this.setState({search: inputValue}, this.jobDisplay)
  }

  empClick = id => {
    const {employmentTypeArr} = this.state
    const isTypeAvailable = employmentTypeArr.includes(id)

    if (isTypeAvailable) {
      const b = employmentTypeArr.indexOf(id)
      employmentTypeArr.splice(b, 1)
      const d = employmentTypeArr.join(',')
      this.setState({employmentType: d}, this.jobDisplay)
    } else {
      employmentTypeArr.push(id)
      const d = employmentTypeArr.join(',')
      this.setState({employmentType: d}, this.jobDisplay)
    }
  }

  salaryClick = id => {
    this.setState({minimumPackage: id}, this.jobDisplay)
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="left-main-container">
            <div>{this.renderProfile()}</div>
            <div style={{margin: '0'}}>
              <hr style={{margin: '0'}} />
            </div>
            <div>
              <h1>Type of Employment</h1>
              {employmentTypesList.map(each => (
                <EmploymentId
                  eachItem={each}
                  empClick={this.empClick}
                  key={each.employmentTypeId}
                />
              ))}
            </div>
            <div style={{margin: '0'}}>
              <hr style={{margin: '0'}} />
            </div>
            <div>
              <h1>Salary Range</h1>
              {salaryRangesList.map(each => (
                <Salary
                  eachItem={each}
                  salaryClick={this.salaryClick}
                  key={each.salaryRangeId}
                />
              ))}
            </div>
          </div>
          <div className="right-main-container">
            <div className="search-container">
              <div className="searchBar">
                <input
                  className="home-input"
                  placeholder="Search"
                  type="search"
                  onChange={this.inputChange}
                  onKeyUp={this.onKeyUpInput}
                />
                {/* eslint-disable-next-line */}
                <button
                  className="home-search"
                  type="button"
                  onClick={this.searchClicked}
                  data-testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
