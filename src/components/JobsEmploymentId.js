const EmploymentId = props => {
  const {eachItem, empClick} = props
  const {label, employmentTypeId} = eachItem

  const employmentClicked = () => {
    empClick(employmentTypeId)
  }

  return (
    <div>
      <input
        id={employmentTypeId}
        onClick={employmentClicked}
        type="checkbox"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )
}

export default EmploymentId
