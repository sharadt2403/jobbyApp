import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './JobItemDetails.css'
import {FaStar, FaSuitcase, FaMoneyBill} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {IoIosArrowBack} from 'react-icons/io'

class JobItemDetails extends Component {
  state = {
    jobItem: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobURL = `https://apis.ccbp.in/jobs/${id}`
    const getMethodOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const getMethod = await fetch(jobURL, getMethodOptions)
    const jobResponse = await getMethod.json()

    const jD = jobResponse.job_details
    const jdSimilar = jobResponse.similar_jobs

    const jobItem = {
      companyLogoUrl: jD.company_logo_url,
      companyWebsiteUrl: jD.company_website_url,
      employmentType: jD.employment_type,
      id: jD.id,
      jobDescription: jD.job_description,
      location: jD.location,
      packagePerAnnum: jD.package_per_annum,
      rating: jD.rating,
      title: jD.title,
    }

    const lifeAtCompany = {
      description: jD.life_at_company.description,
      imageUrlAtCompany: jD.life_at_company.image_url,
    }
    const skills = jD.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const similarJobs = jdSimilar.map(each => ({
      companyLogoUrlSimilar: each.company_logo_url,
      employmentTypeSimilar: each.employment_type,
      idSimilar: each.id,
      jobDescriptionSimilar: each.job_description,
      locationSimilar: each.location,
      ratingSimilar: each.rating,
      titleSimilar: each.title,
    }))

    if (getMethod.ok === true) {
      this.setState({
        jobItem,
        lifeAtCompany,
        skills,
        similarJobs,
        isLoading: false,
      })
    }
  }

  render() {
    const {jobItem, lifeAtCompany, skills, similarJobs} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItem
    console.log(id)

    const {description, imageUrlAtCompany} = lifeAtCompany

    // const {imageUrl, name} = skills

    // const {
    //   companyLogoUrlSimilar,
    //   employmentTypeSimilar,
    //   idSimilar,
    //   jobDescriptionSimilar,
    //   locationSimilar,
    //   ratingSimilar,
    //   titleSimilar,
    // } = similarJobs[0]

    // console.log(idSimilar)

    return (
      <div className="jobItem-main-container">
        <Link to="/jobs" className="jobItem-link">
          <button className="jobItem-back-button" type="button">
            <IoIosArrowBack className="jobItem-back-icon" />
            Back
          </button>
        </Link>
        <div className="jobItem-container">
          <div className="jobItem-title-container">
            <img
              className="jobItem-image"
              style={{width: '50px', height: '50px'}}
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="jobItem-title-sub-container">
              <h1 style={{cursor: 'pointer', margin: '0'}}>{title}</h1>
              <div className="jobItem-rating-container">
                <FaStar className="jobItem-rating-icon" />
                <p style={{margin: '0'}}>{rating}</p>
              </div>
            </div>
          </div>
          <div style={{marginTop: '5px'}}>
            <hr style={{margin: '0'}} />
          </div>

          <div className="jobItem-location-container">
            <div className="jobItem-location-icon-container">
              <MdLocationOn className="location-icon" />
              <p style={{margin: '0'}}>{location}</p>
            </div>
            <div className="jobItem-location-icon-container">
              <FaSuitcase />
              <p style={{margin: '0'}}>{employmentType}</p>
            </div>
            <div className="jobItem-location-icon-container">
              <FaMoneyBill />
              <div style={{margin: '0'}}>{packagePerAnnum}</div>
            </div>
          </div>

          <div style={{margin: '0'}}>
            <hr style={{margin: '0'}} />
          </div>
          <div className="jobItem-description">
            <h1>Description</h1>
            <p className="description-paragraph">{jobDescription}</p>
          </div>
          {/* Skills */}
          <div className="skills-main-container">
            <h1>Skills</h1>
            <div className="skills-card-container">
              {skills.map(each => (
                <div className="skills-container">
                  <img
                    className="skills-image"
                    src={each.imageUrl}
                    alt="skill"
                  />
                  <p className="skills-paragraph">{each.name}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Life At Company */}
          <div className="life-main-container">
            <div className="life-text-container">
              <h1>Life at Company</h1>
              <p style={{margin: '0', fontSize: '15px'}}>{description}</p>
            </div>
            <img src={imageUrlAtCompany} alt="lifeAtCompany" />
          </div>
        </div>
        {/* Similar Jobs */}
        <div>
          <h1>Similar Jobs</h1>
          <div className="similar-job-main-container">
            {similarJobs.map(each => (
              <div className="similar-job-container">
                <a className="a-tag" href={`/jobs/${each.idSimilar}`}>
                  <div className="similar-job-title-container">
                    <img
                      className="similar-job-image"
                      src={each.companyLogoUrlSimilar}
                      alt="job details company logo"
                    />
                    <div className="similar-job-title-sub-container">
                      <h1 className="similar-job-title">{each.titleSimilar}</h1>
                      <div className="similar-job-rating-container">
                        <FaStar className="jobItem-rating-icon" />
                        <p className="jobItem-rating-text">
                          {each.ratingSimilar}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop: '5px'}}>
                    <hr style={{margin: '0', width: '200px'}} />
                  </div>
                  {/* <div className="similar-job-icon-card-container">
                    <div className="similar-job-icon-container">
                      <MdLocationOn className="location-icon" />
                      <p style={{margin: '0'}}>{each.locationSimilar}</p>
                    </div>
                    <div className="similar-job-icon-container">
                      <FaSuitcase />
                      <p style={{margin: '0'}}>{each.employmentTypeSimilar}</p>
                    </div>
                    <div className="similar-job-icon-container">
                      <FaMoneyBill />
                      <div style={{margin: '0'}}>click to view</div>
                    </div>
                  </div> */}

                  {/* <div style={{margin: '0'}}>
                    <hr style={{margin: '0'}} />
                  </div> */}
                  <div className="similar-job-description">
                    <h1>Description</h1>
                    <p style={{margin: '0', fontSize: '15px', width: '200px'}}>
                      {each.jobDescriptionSimilar}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default JobItemDetails
