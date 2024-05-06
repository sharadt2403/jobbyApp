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
    <Link to={`/jobs/${id}`} className="link">
      <div className="details-container">
        <div className="details-title-container">
          <img
            className="details-image"
            style={{width: '50px', height: '50px'}}
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="details-title-sub-container">
            <h1 style={{cursor: 'pointer'}}>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div>
          <div className="location-container">
            <p>{location}</p>
            <p>{employmentType}</p>
            <div>{packagePerAnnum}</div>
          </div>
          <hr />
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
