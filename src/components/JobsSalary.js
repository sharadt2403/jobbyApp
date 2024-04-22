const Salary = props => {
  const {eachItem, salaryClick} = props
  const {salaryRangeId, label} = eachItem

  const salaryClicked = () => {
    salaryClick(salaryRangeId)
  }

  return (
    <div>
      <input
        id={salaryRangeId}
        onClick={salaryClicked}
        type="radio"
        value={salaryRangeId}
        name="Salary"
      />
      <label htmlFor={salaryClicked}>{label}</label>
    </div>
  )
}

export default Salary
