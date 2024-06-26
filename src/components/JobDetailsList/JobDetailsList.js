import {Link} from 'react-router-dom'
import './JobDetailsList.css'
import {FaStar, FaSuitcase, FaMoneyBill} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

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
            <h1 style={{cursor: 'pointer', margin: '0'}}>{title}</h1>
            <div className="details-rating-container">
              <FaStar className="rating-icon" />
              <p style={{margin: '0'}}>{rating}</p>
            </div>
          </div>
        </div>
        <div style={{marginTop: '5px'}}>
          <hr style={{margin: '0'}} />
        </div>

        <div className="location-container">
          <div className="location-icon-container">
            <MdLocationOn className="location-icon" />
            <p style={{margin: '0'}}>{location}</p>
          </div>
          <div className="location-icon-container">
            <FaSuitcase />
            <p style={{margin: '0'}}>{employmentType}</p>
          </div>
          <div className="location-icon-container">
            <FaMoneyBill />
            <div style={{margin: '0'}}>{packagePerAnnum}</div>
          </div>
        </div>

        <div style={{margin: '0'}}>
          <hr style={{margin: '0'}} />
        </div>
        <div className="details-description">
          <h1>Description</h1>
          <p style={{margin: '0', fontSize: '15px'}}>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobDetailsList
