import moment from "moment"
import React, { useReducer, useState } from "react"
import { MdExpandMore, MdKeyboardArrowUp } from "react-icons/md"
import useForm from "../libs/customHooks"
import {
  covidScreeningForm,
  email,
  dropdown,
  childClass,
  success,
} from "./covidscreeningform.module.css"
import users from "../../data/participants.json"
import banna from "../../data/children.json"
import registration from "../../data/register.json"

const members = users.map(participant => {
  const linkParticipant = (array, id) =>
    array.filter(child => child[id] === participant.id)

  return Object.assign(participant, {
    children: linkParticipant(banna, "guardianID"),
    attendanceRegister: linkParticipant(registration, "participantID"),
  })
})

export default function CovidScreeningForm() {
  const [toggle, setToggle] = useState(false)
  // const [participants, setparticipants] = useState([])
  let [participants, setparticipants] = useState(members)
  const [register, setRegister] = useState(null)
  const [child, setChild] = useState([])

  const removeDeuplicate = (array, field) =>
    array.reduce((acc, current) => {
      const x = acc.find(item => item[field] === current[field])
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])

  participants = removeDeuplicate(participants, "id")

  const serviceDate = moment("2021-10-03").format("YYYY-MM-YY")
  const serviceName = "Sunday Service"
  const serviceTime = "07:00"

  const { inputs, handleInputChange } = useForm({
    idInput: 0,
    firstNameInput: "",
    lastNameInput: "",
    phoneInput: "",
    emailInput: "",
    participantTypeInput: "",
    birthdateInput: "",
    temperatureInput: "",
  })

  let checkForUser = participants.filter(
    participant => participant.email === inputs.emailInput
  )

  checkForUser = checkForUser.length >= 1
  let getParticipant = checkForUser ? participants[0] : null
  let checkForChild =
    checkForUser &&
    getParticipant.children &&
    getParticipant.children.map(item => {
      return (
        <ul>
          <li>
            <span>
              {item.firstName} {item.lastName}
            </span>
            <button>Add Child</button>
          </li>
        </ul>
      )
    })

  const generalInputs = {
    id: inputs.idInput,
    firstName: inputs.firstNameInput,
    lastName: inputs.lastNameInput,
    phone: inputs.phoneInput,
    email: inputs.emailInput,
    birthdate: inputs.birthdateInput,
    participantType: inputs.participantTypeInput,
    temperature: inputs.temperatureInput,
    children: null,
  }

  const onToggle = value => {
    setToggle(value)

    if (value === "child" || value === "register") {
      inputs.firstNameInput = ""
      inputs.lastNameInput = ""
      inputs.phoneInput = ""
      inputs.emailInput = ""
      inputs.birthdateInput = ""
      inputs.participantTypeInput = ""
      inputs.temperatureInput = ""
    }
  }

  const addParticipant = () => {
    if (checkForUser) {
      getParticipant.children = removeDeuplicate(child, "id")
      getParticipant["attendanceRegister"] = removeDeuplicate(
        Object.assign([
          ...getParticipant["attendanceRegister"],
          {
            id: getParticipant["attendanceRegister"].length,
            participantID: getParticipant.id,
            serviceName,
            serviceDate,
            serviceTime,
            temperature: inputs.temperatureInput,
            children: child.map(item => ({
              childID: child.id,
              temperature: inputs.temperature,
            })),
          },
        ]),
        "serviceDate"
      )
      setparticipants([...participants, getParticipant])
    }

    // if (!checkForUser) {
    //   setparticipants([...participants, generalInputs])
    // }
    onToggle("success")
  }

  const addChild = () => {
    setChild([...child, generalInputs])
  }

  const inputField = (value, input) =>
    getParticipant ? getParticipant[value] : inputs[input]

  const addRegister = event => {
    event.preventDefault()
    setRegister({
      id: 0,
      participantID: inputField("id", "idInput"),
      serviceName,
      serviceDate,
      serviceTime,
      temperature: inputField("id", "temperatureInput"),
      children: child.length,
    })
    addParticipant()
    onToggle("success")
  }

  const participantsTypeList = [
    "General Congregant",
    "Pastor",
    "Projects",
    "Stewardship",
    "Counselling",
    "Ushering",
    "Parking & Security",
    "IT",
    "Intercession",
    "Health & Safety",
  ]

  return (
    <div className={covidScreeningForm}>
      {toggle === "success" ? (
        <div className={success}>
          <p>
            Registration for {inputField("firstName", "firstNameInput")}{" "}
            {inputField("lastName", "lastNameInput")} was successful
          </p>
          <button onClick={() => onToggle("register")}>New Registration</button>
        </div>
      ) : (
        <>
          {/* <button onClick={addParticipant}>Add</button> */}
          <div className={email}>
            <ul>
              <li
                onClick={() => onToggle(false)}
                style={
                  !toggle || toggle !== "phone"
                    ? {
                        color: "white",
                        backgroundColor: "#0e4f92",
                      }
                    : null
                }
              >
                Email
              </li>
              <li
                onClick={() => onToggle("phone")}
                style={
                  toggle === "phone"
                    ? {
                        color: "white",
                        backgroundColor: "#0e4f92",
                      }
                    : null
                }
              >
                Phone
              </li>
            </ul>
            {toggle !== "phone" && (
              <input
                type="email"
                name="emailInput"
                onChange={handleInputChange}
                defaultValue={inputs.emailInput}
                placeholder="Enter email address"
                required={inputs.phoneInput || checkForUser ? false : true}
              />
            )}
            {toggle === "phone" && (
              <input
                type="tel"
                name="phoneInput"
                onChange={handleInputChange}
                defaultValue={inputs.phoneInput}
                placeholder="Enter cellphone"
              />
            )}
            {inputs.emailInput || inputs.phoneInput ? null : (
              <p>To proceed please enter your email or cellphone number</p>
            )}
          </div>

          {(inputs.emailInput || inputs.phoneInput) && (
            <>
              <div
                style={{
                  display: checkForUser && "none",
                }}
              >
                <label htmlFor="participant">
                  Select Participant <span>*</span>
                </label>
                <ul className={dropdown}>
                  <li
                    onClick={() =>
                      onToggle(
                        toggle === "participants" ? false : "participants"
                      )
                    }
                  >
                    <span>
                      {inputs.participantTypeInput
                        ? inputs.participantTypeInput
                        : "Please select"}
                    </span>
                    <span>
                      {toggle === "participants" ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdExpandMore />
                      )}
                    </span>
                  </li>
                  {toggle === "participants" && (
                    <ul>
                      {participantsTypeList.map((participant, i) => (
                        <li key={i} onClick={() => onToggle(false)}>
                          {participant}
                          <input
                            type="radio"
                            name="participantTypeInput"
                            onChange={handleInputChange}
                            defaultValue={participant}
                            required={checkForUser}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>

              <div
                style={{
                  display: checkForUser && "none",
                }}
              >
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="firstNameInput"
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  defaultValue={inputs.firstNameInput}
                  required={checkForUser}
                />
              </div>

              <div
                style={{
                  display: checkForUser && "none",
                }}
              >
                <label>
                  Surname <span>*</span>
                </label>
                <input
                  type="text"
                  name="lastNameInput"
                  onChange={handleInputChange}
                  placeholder="Enter Surname"
                  defaultValue={inputs.lastNameInput}
                  required={checkForUser}
                />
              </div>

              <div
                style={{
                  display: checkForUser && "none",
                }}
              >
                <label>
                  Birthdate <span>*</span>
                </label>
                <input
                  type="date"
                  name="birthdateInput"
                  onChange={handleInputChange}
                  defaultValue={inputs.birthdateInput}
                  required={checkForUser}
                />
              </div>

              <div>
                <label>
                  Temperature <span>*</span>
                </label>
                <input
                  type="text"
                  name="temperatureInput"
                  onChange={handleInputChange}
                  placeholder="Enter Temperature"
                  defaultValue={inputs.temperatureInput}
                  // required={checkForUser}
                />
              </div>
            </>
          )}
          <div className={childClass}>
            {inputs.temperatureInput &&
              (inputs.emailInput || inputs.phoneInput) && (
                <header>
                  <h3>Children</h3>

                  <button type="button" onClick={() => onToggle("children")}>
                    Add New Child
                  </button>
                </header>
              )}
            {checkForChild}
            {toggle === "children" && (
              <div>
                <div>
                  <label>
                    First Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstNameInput"
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                  />
                </div>
                <div
                // style={{
                //   display: checkForUser && "none",
                // }}
                >
                  <label>
                    Surname <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastNameInput"
                    onChange={handleInputChange}
                    placeholder="Enter Surname"
                    // required={checkForUser}
                  />
                </div>
                <div
                // style={{
                //   display: checkForUser && "none",
                // }}
                >
                  <label>
                    Birthdate <span>*</span>
                  </label>
                  <input
                    type="date"
                    name="birthdateInput"
                    onChange={handleInputChange}
                    required={checkForUser}
                  />
                </div>

                <div>
                  <label>
                    Temperature <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="temperatureInput"
                    onChange={handleInputChange}
                    placeholder="Enter Temperature"
                  />
                </div>
              </div>
            )}
          </div>
          <button onClick={addParticipant}>Add Attendee</button>
        </>
      )}
    </div>
  )
}

// export const query = graphql`
//   {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
