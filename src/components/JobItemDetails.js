import {Component} from 'react'
import Cookies from 'js-cookie'

class JobItemDetails extends Component {
  state = {jobItem: {}, isLoading: true}

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
    const jsimilar = jobResponse.similar_jobs
    const modifiedJD = {
      jobDetails: {
        companyLogoUrl: jD.company_logo_url,
        companyWebsiteUrl: jD.company_website_url,
        employmentType: jD.employment_type,
        id: jD.id,
        jobDescription: jD.job_description,
        lifeAtCompany: {
          description: jD.life_at_company.description,
          imageUrl: jD.life_at_company.image_url,
        },
        location: jD.location,
        packagePerAnnum: jD.package_per_annum,
        rating: jD.rating,
        skills: jD.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        title: jD.title,
      },
      similarJobs: jsimilar.map(each => ({
        companyLogoUrlSimilar: each.company_logo_url,
        employmentTypeSimilar: each.employment_type,
        idSimilar: each.id,
        jobDescriptionSimilar: each.job_description,
        locationSimilar: each.location,
        ratingSimilar: each.rating,
        titleSimilar: each.title,
      })),
    }

    if (getMethod.ok === true) {
      this.setState({jobItem: modifiedJD, isLoading: false})
    }
  }

  render() {
    const {jobItem, isLoading} = this.state
    const {jobDetails, similarJobs} = jobItem

    console.log(similarJobs)
    // console.log(companyLogoUrl)
    // const {
    //   companyLogoUrl,
    //   companyWebsiteUrl,
    //   employmentType,
    //   id,
    //   jobDescription,
    //   lifeAtCompany,
    //   location,
    //   packagePerAnnum,
    //   rating,
    //   skills,
    //   title,
    // } = jobDetails
    // const {description, imageUrl} = lifeAtCompany
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
      <div>
        <h1>jobDescription}</h1>
        <h1>jobDescriptionSimilar}</h1>
      </div>
    )
  }
}
export default JobItemDetails
