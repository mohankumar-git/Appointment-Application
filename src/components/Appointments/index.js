import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    nameInputs: '',
    dateInputs: '',
    appointmentsList: [],
    isStarredActive: false,
  }

  appAddAppointment = event => {
    event.preventDefault()
    const {nameInputs, dateInputs} = this.state

    const newAppointment = {
      id: uuid(),
      title: nameInputs,
      date: dateInputs,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      nameInputs: '',
      dateInputs: '',
    }))
  }

  getTitleInputs = event => {
    this.setState({nameInputs: event.target.value})
  }

  getDateInputs = event => {
    this.setState({dateInputs: event.target.value})
  }

  toggleStarredList = () => {
    this.setState(prevState => ({isStarredActive: !prevState.isStarredActive}))
  }

  getFilteredAppointmentList = () => {
    const {isStarredActive, appointmentsList} = this.state

    if (isStarredActive) {
      const filteredStarredList = appointmentsList.filter(
        eachApp => eachApp.isStarred === true,
      )

      return filteredStarredList
    }

    return appointmentsList
  }

  switchStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {nameInputs, dateInputs, isStarredActive} = this.state

    const filteredList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="appointments-app-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="appointment-inputs">
            <form
              className="appointment-form"
              onSubmit={this.appAddAppointment}
            >
              <label htmlFor="titleInputs" className="label">
                TITLE
              </label>
              <input
                id="titleInputs"
                type="text"
                value={nameInputs}
                placeholder="Title"
                className="inputs"
                onChange={this.getTitleInputs}
              />

              <label htmlFor="date-inputs" className="label">
                DATE
              </label>
              <input
                id="date-inputs"
                placeholder="dd/MMMM/yyyy"
                type="date"
                className="inputs"
                onChange={this.getDateInputs}
                value={dateInputs}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-img"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointments-container">
            <div className="appointment-header">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={
                  isStarredActive
                    ? 'starred-list-btn active-btn'
                    : 'starred-list-btn'
                }
                onClick={this.toggleStarredList}
              >
                Starred
              </button>
            </div>
            <ul className="display-appointment">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  switchStar={this.switchStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
