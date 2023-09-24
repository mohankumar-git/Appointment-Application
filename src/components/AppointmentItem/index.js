import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, switchStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const FormattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onToggleStar = () => {
    switchStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">Date: {FormattedDate}</p>
      </div>
      <button
        onClick={onToggleStar}
        data-testid="star"
        type="button"
        className="star-btn"
      >
        <img src={imageUrl} alt="star" className="star-icon" />
      </button>
    </li>
  )
}

export default AppointmentItem
