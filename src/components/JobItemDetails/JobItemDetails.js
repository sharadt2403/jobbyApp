import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  ColumnContainer,
  RowContainer,
  CompanyLogo,
  Image,
} from './JobItemStyledComp'
import './JobItemDetails.css'

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
    console.log(jwtToken)
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
    console.log(jobResponse.job_details.company_logo_url)
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

    //   employmentType,
    //   id,
    //   jobDescription,
    //   location,
    //   packagePerAnnum,
    //   rating,
    //   title,

    const {companyLogoUrl, companyWebsiteUrl, rating} = jobItem
    console.log(companyWebsiteUrl)

    const {description, imageUrlAtCompany} = lifeAtCompany

    const {imageUrl, name} = skills

    // const {
    //   companyLogoUrlSimilar,
    //   employmentTypeSimilar,
    //   idSimilar,
    //   jobDescriptionSimilar,
    //   locationSimilar,
    //   ratingSimilar,
    //   titleSimilar,
    // } = similarJobs[0]

    return (
      <ColumnContainer>
        <ColumnContainer>
          <RowContainer>
            <CompanyLogo src={companyLogoUrl} alt="job details company logo" />
            <ColumnContainer>
              <h1>TITLE</h1>
              <RowContainer>
                <p>icon rating</p>
                <p>{rating}</p>
              </RowContainer>
            </ColumnContainer>
          </RowContainer>

          <RowContainer>
            <RowContainer>
              <RowContainer>
                <p>icon location </p>
                <p>location </p>
              </RowContainer>
              <RowContainer>
                <p>icon location </p>
                <p>location </p>
              </RowContainer>
            </RowContainer>
            <div>
              <p>28 LPA</p>
            </div>
          </RowContainer>
          <hr />
          <ColumnContainer>
            <RowContainer>
              <h1>Description</h1>
              <RowContainer>
                <a target="_blank" rel="noreferrer" href={companyWebsiteUrl}>
                  Visit
                </a>
                <p>icon Visit</p>
              </RowContainer>
            </RowContainer>
            <p>{description}</p>
          </ColumnContainer>
          <ColumnContainer>
            <h1>Skills</h1>
            <RowContainer>
              <RowContainer>
                <CompanyLogo src="" alt="job details company logo" />
                <p>HTML 5</p>
              </RowContainer>
            </RowContainer>
            <ColumnContainer>
              <h1>Life at Company</h1>
              <RowContainer>
                <p>From building the future.....</p>
                <Image src={imageUrlAtCompany} alt="life at company" />
              </RowContainer>
            </ColumnContainer>
          </ColumnContainer>
        </ColumnContainer>
        {/* Similar jobs container */}
        <ColumnContainer>
          <h1>Similar Jobs</h1>
          <RowContainer>
            <ColumnContainer>
              <RowContainer>
                <CompanyLogo
                  src={companyLogoUrl}
                  alt="similar job company logo"
                />
                <ColumnContainer>
                  <h1>TITLE</h1>
                  <RowContainer>
                    <p>icon rating</p>
                    <p>{rating}</p>
                  </RowContainer>
                </ColumnContainer>
              </RowContainer>
              <ColumnContainer>
                <h1>Description</h1>
                <p>{description}</p>
              </ColumnContainer>
            </ColumnContainer>
            {/* section 2 */}
            <ColumnContainer>
              <RowContainer>
                <CompanyLogo
                  src={companyLogoUrl}
                  alt="similar job company logo"
                />
                <ColumnContainer>
                  <h1>TITLE</h1>
                  <RowContainer>
                    <p>icon rating</p>
                    <p>{rating}</p>
                  </RowContainer>
                </ColumnContainer>
              </RowContainer>
              <ColumnContainer>
                <h1>Description</h1>
                <p>{description}</p>
              </ColumnContainer>
            </ColumnContainer>
            {/* section 3 */}
            <ColumnContainer>
              <RowContainer>
                <CompanyLogo
                  src={companyLogoUrl}
                  alt="similar job company logo"
                />
                <ColumnContainer>
                  <h1>TITLE</h1>
                  <RowContainer>
                    <p>icon rating</p>
                    <p>{rating}</p>
                  </RowContainer>
                </ColumnContainer>
              </RowContainer>
              <ColumnContainer>
                <h1>Description</h1>
                <p>{description}</p>
              </ColumnContainer>
            </ColumnContainer>
          </RowContainer>
        </ColumnContainer>
      </ColumnContainer>
    )
  }
}
export default JobItemDetails
