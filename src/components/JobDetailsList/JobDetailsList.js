import {Link} from 'react-router-dom'
import './JobDetailsList.css'

const JobDetailsList = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <Link to={`/jobs/${id}`}>
      <div className="details-container">
        <div className="details-title-container">
          <img
            style={{width: '50px', height: '50px'}}
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div>
            <h1 style={{cursor: 'pointer'}}>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <p>{location}</p>
          <p>{employmentType}</p>
          <div>{packagePerAnnum}</div>
        </div>
        <div>
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobDetailsList
