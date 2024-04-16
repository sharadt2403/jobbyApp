import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const JobDetailsList = props => {
  const {item, clickedJobId} = props
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

  const clickedId = () => {
    clickedJobId(id)
  }

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-card" style={{fontSize: '10px'}}>
        <div>
          <img
            style={{width: '50px', height: '50px'}}
            src={companyLogoUrl}
            alt="Company Logo"
          />
          <div>
            <h1 onClick={clickedId} style={{cursor: 'pointer'}}>
              {title}
            </h1>
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
